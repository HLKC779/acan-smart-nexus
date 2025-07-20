import { ArrowLeft, Brain, Database, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const MemorySystem = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Components
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Memory System</h1>
                <p className="text-sm text-muted-foreground">System Architecture Component</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Advanced memory architecture combining short-term, long-term, and contextual memory for persistent learning.
                The memory system provides persistent storage and retrieval capabilities for AI agents, enabling continuous 
                learning and context retention across sessions.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Short-Term", "Long-Term", "Hybrid Memory", "Context Recall"].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border/50">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Architecture</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Input</h4>
                  <p className="text-muted-foreground text-sm">Conversation data and contextual information</p>
                </Card>
                <Card className="p-6 border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Processing</h4>
                  <p className="text-muted-foreground text-sm">Memory encoding, storage, and retrieval mechanisms</p>
                </Card>
                <Card className="p-6 border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Output</h4>
                  <p className="text-muted-foreground text-sm">Relevant context and learned patterns</p>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Code Example</h3>
              <Card className="p-6 bg-muted/50 border border-border/50">
                <pre className="text-sm text-foreground overflow-x-auto">
                  <code>{`# MemGPT Memory Example
from memgpt import MemGPT

agent = MemGPT(
    memory_config={
        "core_memory_limit": 2048,
        "recall_memory_limit": 8192,
        "archival_memory": True
    }
)

# Store important information
agent.core_memory.edit(
    "user_preferences", 
    "User prefers technical explanations"
)

# Retrieve relevant memories
memories = agent.recall_memory.search(
    "previous discussions about AI"
)`}</code>
                </pre>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Benefits</h3>
              <div className="space-y-3">
                {[
                  "Persistent learning",
                  "Context retention",
                  "Personalized responses",
                  "Knowledge accumulation",
                  "Improved reasoning"
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Use Cases</h3>
              <div className="space-y-2">
                {[
                  "Personalized user interactions",
                  "Learning from conversations",
                  "Context-aware responses",
                  "Knowledge accumulation",
                  "Experience-based decisions"
                ].map((useCase) => (
                  <Badge key={useCase} variant="outline" className="block text-center py-2">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Integrations</h3>
              <div className="space-y-2">
                {["Vector Databases", "Graph Databases", "Embeddings", "Knowledge Graphs"].map((integration) => (
                  <div key={integration} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                    <Database className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground text-sm">{integration}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemorySystem;