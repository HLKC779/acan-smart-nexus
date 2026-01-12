-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create documents table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  file_name TEXT,
  file_type TEXT,
  file_size INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on documents
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Documents policies
CREATE POLICY "Users can view their own documents" 
ON public.documents 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own documents" 
ON public.documents 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
ON public.documents 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" 
ON public.documents 
FOR DELETE 
USING (auth.uid() = user_id);

-- Enable pgvector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create document_chunks table for RAG
CREATE TABLE public.document_chunks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE NOT NULL,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on document_chunks
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;

-- Document chunks inherit access from parent document
CREATE POLICY "Users can view chunks of their documents" 
ON public.document_chunks 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.documents 
    WHERE documents.id = document_chunks.document_id 
    AND documents.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create chunks for their documents" 
ON public.document_chunks 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.documents 
    WHERE documents.id = document_chunks.document_id 
    AND documents.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete chunks of their documents" 
ON public.document_chunks 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.documents 
    WHERE documents.id = document_chunks.document_id 
    AND documents.user_id = auth.uid()
  )
);

-- Create index for vector similarity search
CREATE INDEX document_chunks_embedding_idx ON public.document_chunks 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON public.documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();