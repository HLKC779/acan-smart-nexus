import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, content, fileData } = await req.json();

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('Processing document:', title);

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
      global: { headers: { Authorization: req.headers.get('Authorization')! } }
    });

    // Get user from JWT token
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    console.log('User authenticated:', user.id);

    // Insert document into database
    const { data: document, error: docError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        title,
        content,
        file_name: fileData?.name,
        file_type: fileData?.type,
        file_size: fileData?.size,
        metadata: fileData ? { uploadedAt: new Date().toISOString() } : {}
      })
      .select()
      .single();

    if (docError) {
      console.error('Document insertion error:', docError);
      return new Response(
        JSON.stringify({ error: 'Failed to save document', details: docError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log('Document saved:', document.id);

    // Split content into chunks (roughly 1000 characters each)
    const chunkSize = 1000;
    const overlap = 200; // Overlap between chunks for better context
    const chunks: string[] = [];

    for (let i = 0; i < content.length; i += chunkSize - overlap) {
      const chunk = content.slice(i, i + chunkSize);
      if (chunk.trim().length > 0) {
        chunks.push(chunk.trim());
      }
    }

    console.log(`Created ${chunks.length} chunks`);

    // Generate embeddings for each chunk
    const chunkInserts = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      
      try {
        console.log(`Generating embedding for chunk ${i + 1}/${chunks.length}`);
        
        // Generate embedding using OpenAI
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: chunk,
            model: 'text-embedding-ada-002'
          }),
        });

        if (!embeddingResponse.ok) {
          const errorText = await embeddingResponse.text();
          console.error(`OpenAI API error for chunk ${i}:`, errorText);
          throw new Error(`OpenAI API error: ${embeddingResponse.status}`);
        }

        const embeddingData = await embeddingResponse.json();
        const embedding = embeddingData.data[0].embedding;

        chunkInserts.push({
          document_id: document.id,
          chunk_index: i,
          content: chunk,
          embedding,
          metadata: {
            chunkSize: chunk.length,
            totalChunks: chunks.length
          }
        });
      } catch (error) {
        console.error(`Error processing chunk ${i}:`, error);
        // Continue processing other chunks even if one fails
      }
    }

    console.log(`Inserting ${chunkInserts.length} chunks into database`);

    // Insert all chunks at once
    const { error: chunksError } = await supabase
      .from('document_chunks')
      .insert(chunkInserts);

    if (chunksError) {
      console.error('Chunks insertion error:', chunksError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save document chunks', 
          details: chunksError.message 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    console.log('Document indexing completed successfully');

    return new Response(
      JSON.stringify({
        success: true,
        documentId: document.id,
        chunksProcessed: chunkInserts.length,
        message: `Successfully indexed "${title}" with ${chunkInserts.length} chunks`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Document indexing error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});