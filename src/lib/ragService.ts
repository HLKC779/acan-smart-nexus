import { supabase } from "@/integrations/supabase/client";

export interface Document {
  id: string;
  title: string;
  content: string;
  file_name?: string;
  file_type?: string;
  file_size?: number;
  created_at: string;
  updated_at: string;
}

export interface RAGSearchResult {
  id: string;
  content: string;
  similarity: number;
  document_title: string;
  document_id: string;
}

export interface RAGResponse {
  response: string;
  contextUsed: boolean;
  ragResults: number;
  sources: Array<{
    documentTitle: string;
    content: string;
    similarity: number;
  }>;
}

export class RAGService {
  private static instance: RAGService;

  static getInstance(): RAGService {
    if (!RAGService.instance) {
      RAGService.instance = new RAGService();
    }
    return RAGService.instance;
  }

  private constructor() {}

  /**
   * Index a document by creating chunks and embeddings
   */
  async indexDocument(title: string, content: string, fileData?: {
    name: string;
    type: string;
    size: number;
  }): Promise<{ success: boolean; documentId?: string; error?: string }> {
    try {
      console.log('Indexing document:', title);

      const { data, error } = await supabase.functions.invoke('index-document', {
        body: {
          title,
          content,
          fileData
        }
      });

      if (error) {
        console.error('Document indexing error:', error);
        return { success: false, error: error.message };
      }

      console.log('Document indexed successfully:', data);
      return { 
        success: true, 
        documentId: data.documentId 
      };
    } catch (error) {
      console.error('Document indexing failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Search for relevant documents using RAG
   */
  async searchDocuments(
    query: string, 
    options: { limit?: number; threshold?: number } = {}
  ): Promise<{ results: RAGSearchResult[]; context: string; error?: string }> {
    try {
      console.log('Searching documents for:', query);

      const { data, error } = await supabase.functions.invoke('rag-search', {
        body: {
          query,
          limit: options.limit || 5,
          threshold: options.threshold || 0.6
        }
      });

      if (error) {
        console.error('RAG search error:', error);
        return { results: [], context: '', error: error.message };
      }

      console.log('RAG search completed:', data);
      return {
        results: data.results || [],
        context: data.context || ''
      };
    } catch (error) {
      console.error('RAG search failed:', error);
      return {
        results: [],
        context: '',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Chat with RAG-enhanced AI
   */
  async chatWithRAG(
    message: string, 
    sessionId?: string
  ): Promise<RAGResponse | { error: string }> {
    try {
      console.log('RAG chat request:', message);

      const { data, error } = await supabase.functions.invoke('rag-chat', {
        body: {
          message,
          sessionId
        }
      });

      if (error) {
        console.error('RAG chat error:', error);
        return { error: error.message };
      }

      console.log('RAG chat response:', data);
      return data;
    } catch (error) {
      console.error('RAG chat failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get all user documents
   */
  async getDocuments(): Promise<{ documents: Document[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Get documents error:', error);
        return { documents: [], error: error.message };
      }

      return { documents: data || [] };
    } catch (error) {
      console.error('Get documents failed:', error);
      return {
        documents: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Delete a document and its chunks
   */
  async deleteDocument(documentId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);

      if (error) {
        console.error('Delete document error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Delete document failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test the RAG system with sample data
   */
  async testRAGSystem(): Promise<{ success: boolean; results?: any; error?: string }> {
    try {
      console.log('Testing RAG system...');

      // Test document indexing
      const sampleDocument = {
        title: "AI Agent Systems Overview",
        content: `AI agent systems are sophisticated computational frameworks designed to perform tasks autonomously. These systems combine multiple AI technologies including natural language processing, machine learning, and reasoning capabilities.

Key components include:
1. Agentic Frameworks - Tools like LangGraph, CrewAI, and Autogen for orchestrating AI agents
2. Memory Systems - Short-term and long-term memory for context retention
3. Tool Integration - Connecting with external APIs and services
4. Reasoning Frameworks - ReAct, Reflexion, and Tree of Thought for structured problem solving
5. Knowledge Bases - Vector databases and knowledge graphs for information storage

These systems enable complex automation, intelligent decision-making, and collaborative problem-solving across various domains including healthcare, finance, education, and smart city management.`
      };

      const indexResult = await this.indexDocument(
        sampleDocument.title,
        sampleDocument.content
      );

      if (!indexResult.success) {
        return { success: false, error: 'Failed to index test document' };
      }

      // Wait a bit for indexing to complete
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Test RAG search
      const searchResult = await this.searchDocuments('What are the key components of AI agent systems?');

      if (searchResult.error) {
        return { success: false, error: 'Failed to search documents' };
      }

      // Test RAG chat
      const chatResult = await this.chatWithRAG('Tell me about AI agent frameworks');

      if ('error' in chatResult) {
        return { success: false, error: 'Failed to chat with RAG' };
      }

      console.log('RAG system test completed successfully');

      return {
        success: true,
        results: {
          indexing: indexResult,
          search: searchResult,
          chat: chatResult
        }
      };
    } catch (error) {
      console.error('RAG system test failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}