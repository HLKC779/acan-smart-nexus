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
    const { query, limit = 5, threshold = 0.7 } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('RAG search query:', query);

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

    // Generate embedding for the search query
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: query,
        model: 'text-embedding-ada-002'
      }),
    });

    if (!embeddingResponse.ok) {
      const errorText = await embeddingResponse.text();
      console.error('OpenAI API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate query embedding' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    console.log('Generated query embedding');

    // Search for similar chunks using vector similarity
    const { data: chunks, error: searchError } = await supabase.rpc('search_document_chunks', {
      query_embedding: queryEmbedding,
      similarity_threshold: threshold,
      match_count: limit,
      user_id: user.id
    });

    if (searchError) {
      console.error('Search error:', searchError);
      // Fallback: try manual search if RPC function doesn't exist
      const { data: fallbackChunks, error: fallbackError } = await supabase
        .from('document_chunks')
        .select(`
          *,
          documents!inner(
            id,
            title,
            user_id
          )
        `)
        .eq('documents.user_id', user.id)
        .limit(limit);

      if (fallbackError) {
        return new Response(
          JSON.stringify({ error: 'Search failed', details: fallbackError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }

      console.log(`Fallback search returned ${fallbackChunks?.length || 0} chunks`);

      return new Response(
        JSON.stringify({
          results: fallbackChunks || [],
          context: (fallbackChunks || []).map(chunk => chunk.content).join('\n\n'),
          fallback: true
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${chunks?.length || 0} relevant chunks`);

    // Compile context from relevant chunks
    const context = (chunks || []).map(chunk => chunk.content).join('\n\n');

    return new Response(
      JSON.stringify({
        results: chunks || [],
        context,
        similarity_threshold: threshold,
        query_used: query
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('RAG search error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});