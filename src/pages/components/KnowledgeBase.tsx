import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Database, ExternalLink, CheckCircle } from "lucide-react";

const KnowledgeBase = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Database className="h-6 w-6 text-orange-500" />
              </div>
              <h1 className="text-2xl font-bold">Knowledge Base</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Scalable knowledge storage and retrieval using vector databases and knowledge graphs for intelligent information access.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  The knowledge base component provides intelligent storage and retrieval of information using advanced techniques like vector embeddings and graph relationships. It enables semantic search, relationship discovery, and contextual information access.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Vector DBs", "Knowledge Graphs", "Hybrid Search", "Pinecone", "Neo4j"].map((feature) => (
                    <Badge key={feature} variant="secondary">{feature}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Features */}
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Semantic search",
                    "Scalable storage",
                    "Fast retrieval",
                    "Relationship discovery", 
                    "Context awareness"
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Architecture */}
            <Card>
              <CardHeader>
                <CardTitle>Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Input</h4>
                    <p className="text-sm text-muted-foreground">Documents, data, and knowledge sources</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Processing</h4>
                    <p className="text-sm text-muted-foreground">Embedding generation, indexing, and semantic search</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Output</h4>
                    <p className="text-sm text-muted-foreground">Relevant information and relationships</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Example */}
            <Card>
              <CardHeader>
                <CardTitle>Code Example</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`# Vector Database Example
import pinecone
from sentence_transformers import SentenceTransformer

# Initialize embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Create embeddings
text = "AI agent systems architecture"
embedding = model.encode([text])

# Store in vector database
index.upsert([
    ("doc_1", embedding[0].tolist(), {"text": text})
])

# Semantic search
results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True
)`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Semantic search systems",
                  "Knowledge discovery",
                  "Document intelligence",
                  "Relationship mapping",
                  "Information synthesis"
                ].map((useCase) => (
                  <div key={useCase} className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">
                      <ExternalLink className="h-3 w-3" />
                    </Badge>
                    <span className="text-sm">{useCase}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { step: "Choose Storage Solution", description: "Select vector database and/or graph database for your needs" },
                  { step: "Design Schema", description: "Define data structure and relationship models" },
                  { step: "Implement Indexing", description: "Set up embedding generation and indexing pipeline" },
                  { step: "Build Search Interface", description: "Create search and retrieval functionality" }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <h4 className="font-medium text-sm">{item.step}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground ml-8">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;