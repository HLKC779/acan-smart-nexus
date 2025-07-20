import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { RAGService, Document } from "@/lib/ragService";
import {
  Upload,
  FileText,
  Search,
  Trash2,
  Plus,
  Database,
  Brain,
  Loader2,
  TestTube
} from "lucide-react";

const RAGManager = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocContent, setNewDocContent] = useState('');
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  
  const { toast } = useToast();
  const ragService = RAGService.getInstance();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const result = await ragService.getDocuments();
      if (result.error) {
        toast({
          title: "Error Loading Documents",
          description: result.error,
          variant: "destructive",
        });
      } else {
        setDocuments(result.documents);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDocument = async () => {
    if (!newDocTitle.trim() || !newDocContent.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      toast({
        title: "Indexing Document",
        description: "Processing and creating embeddings...",
      });

      const result = await ragService.indexDocument(newDocTitle, newDocContent);
      
      if (result.success) {
        toast({
          title: "Document Added",
          description: "Document has been indexed successfully",
        });
        setNewDocTitle('');
        setNewDocContent('');
        setShowAddDocument(false);
        loadDocuments();
      } else {
        toast({
          title: "Indexing Failed",
          description: result.error || "Failed to index document",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    setIsLoading(true);
    try {
      const result = await ragService.deleteDocument(documentId);
      
      if (result.success) {
        toast({
          title: "Document Deleted",
          description: "Document has been removed from the knowledge base",
        });
        loadDocuments();
      } else {
        toast({
          title: "Delete Failed",
          description: result.error || "Failed to delete document",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const result = await ragService.searchDocuments(searchQuery);
      
      if (result.error) {
        toast({
          title: "Search Failed",
          description: result.error,
          variant: "destructive",
        });
      } else {
        setSearchResults(result.results);
        toast({
          title: "Search Complete",
          description: `Found ${result.results.length} relevant chunks`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Search failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestRAG = async () => {
    setIsTesting(true);
    try {
      toast({
        title: "Testing RAG System",
        description: "Running comprehensive tests...",
      });

      const result = await ragService.testRAGSystem();
      
      if (result.success) {
        toast({
          title: "RAG Test Successful",
          description: "All RAG components are working correctly",
        });
        loadDocuments(); // Refresh to show test document
      } else {
        toast({
          title: "RAG Test Failed",
          description: result.error || "Test failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Test Error",
        description: "Failed to run RAG tests",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="w-6 h-6 text-primary" />
            RAG Knowledge Base
          </h2>
          <p className="text-muted-foreground">
            Manage documents for AI-enhanced conversations
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleTestRAG}
            disabled={isTesting}
            variant="outline"
            size="sm"
          >
            {isTesting ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <TestTube className="w-4 h-4 mr-2" />
            )}
            Test RAG System
          </Button>
          <Button
            onClick={() => setShowAddDocument(!showAddDocument)}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Document
          </Button>
        </div>
      </div>

      {/* Add Document Form */}
      {showAddDocument && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Document
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Document title..."
              value={newDocTitle}
              onChange={(e) => setNewDocTitle(e.target.value)}
            />
            <Textarea
              placeholder="Document content..."
              value={newDocContent}
              onChange={(e) => setNewDocContent(e.target.value)}
              rows={8}
            />
            <div className="flex gap-2">
              <Button onClick={handleAddDocument} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                Index Document
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddDocument(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Search Results:</h4>
              <ScrollArea className="h-40">
                {searchResults.map((result, index) => (
                  <div key={index} className="p-3 border rounded mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {result.document_title}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {(result.similarity * 100).toFixed(1)}% match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.content.substring(0, 200)}...
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documents ({documents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading documents...
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No documents in knowledge base</p>
              <p className="text-sm">Add some documents to enable RAG functionality</p>
            </div>
          ) : (
            <ScrollArea className="h-60">
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border rounded hover:bg-muted/50"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{doc.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {doc.content.substring(0, 100)}...
                      </p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {new Date(doc.created_at).toLocaleDateString()}
                        </Badge>
                        {doc.file_name && (
                          <Badge variant="secondary" className="text-xs">
                            {doc.file_name}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDocument(doc.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RAGManager;