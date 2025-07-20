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
    const { message, sessionId } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log('RAG Chat request:', message);

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

    // Step 1: Search for relevant context using RAG
    const ragResponse = await fetch(`${supabaseUrl}/functions/v1/rag-search`, {
      method: 'POST',
      headers: {
        'Authorization': req.headers.get('Authorization')!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
        limit: 5,
        threshold: 0.6
      }),
    });

    let context = '';
    let ragResults = [];

    if (ragResponse.ok) {
      const ragData = await ragResponse.json();
      context = ragData.context || '';
      ragResults = ragData.results || [];
      console.log(`RAG search found ${ragResults.length} relevant chunks`);
    } else {
      console.log('RAG search failed, proceeding without context');
    }

    // Step 2: Generate AI response with context
    const systemPrompt = context 
      ? `You are an AI assistant with access to relevant information from the user's knowledge base. Use the following context to answer the user's question accurately and helpfully. If the context doesn't contain relevant information, still provide a helpful response based on your general knowledge.

Context from knowledge base:
${context}

Instructions:
- Reference the context when relevant
- If the context contains specific information that answers the user's question, prioritize that information
- If the context is not relevant to the question, provide a general helpful response
- Be clear about whether your answer comes from the provided context or general knowledge
- Keep responses concise but comprehensive`
      : `You are a helpful AI assistant. The user doesn't have any relevant documents in their knowledge base for this query, so provide a helpful response based on your general knowledge.`;

    const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!chatResponse.ok) {
      const errorText = await chatResponse.text();
      console.error('OpenAI API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate AI response' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const chatData = await chatResponse.json();
    const aiResponse = chatData.choices[0].message.content;

    // Step 3: Save chat session if sessionId provided
    if (sessionId) {
      try {
        const { error: sessionError } = await supabase
          .from('chat_sessions')
          .upsert({
            id: sessionId,
            user_id: user.id,
            title: message.substring(0, 50) + (message.length > 50 ? '...' : ''),
            context: {
              lastMessage: message,
              lastResponse: aiResponse,
              ragResultsCount: ragResults.length,
              timestamp: new Date().toISOString()
            }
          });

        if (sessionError) {
          console.error('Session save error:', sessionError);
        }
      } catch (sessionSaveError) {
        console.error('Session save error:', sessionSaveError);
      }
    }

    return new Response(
      JSON.stringify({
        response: aiResponse,
        contextUsed: !!context,
        ragResults: ragResults.length,
        sources: ragResults.map(r => ({
          documentTitle: r.document_title,
          content: r.content.substring(0, 200) + '...',
          similarity: r.similarity
        }))
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('RAG chat error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});