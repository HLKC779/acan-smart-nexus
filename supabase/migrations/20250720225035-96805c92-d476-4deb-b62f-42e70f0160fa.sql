-- Create function for vector similarity search
CREATE OR REPLACE FUNCTION search_document_chunks(
  query_embedding VECTOR(1536),
  similarity_threshold FLOAT DEFAULT 0.5,
  match_count INT DEFAULT 10,
  user_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  document_id UUID,
  content TEXT,
  chunk_index INT,
  similarity FLOAT,
  document_title TEXT,
  document_created_at TIMESTAMPTZ
)
LANGUAGE SQL
STABLE
AS $$
  SELECT
    dc.id,
    dc.document_id,
    dc.content,
    dc.chunk_index,
    (dc.embedding <=> query_embedding) * -1 + 1 AS similarity,
    d.title AS document_title,
    d.created_at AS document_created_at
  FROM document_chunks dc
  JOIN documents d ON dc.document_id = d.id
  WHERE 
    (user_id IS NULL OR d.user_id = user_id)
    AND (dc.embedding <=> query_embedding) < (1 - similarity_threshold)
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
$$;