import { ArrowLeft, Network, Code, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const AgenticFrameworks = () => {
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
                <Network className="w-5 h-5 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Agentic Frameworks</h1>
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
                Foundational frameworks for building and orchestrating intelligent AI agents with specialized roles and capabilities. 
                These frameworks provide the infrastructure for complex task decomposition, role assignment, and collaborative 
                problem-solving across distributed agent networks.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {["LangGraph", "CrewAI", "Autogen", "MetaGPT", "LlamaIndex"].map((feature) => (
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
                  <p className="text-muted-foreground text-sm">Task requirements and specifications</p>
                </Card>
                <Card className="p-6 border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Processing</h4>
                  <p className="text-muted-foreground text-sm">Agent coordination, task distribution, and result aggregation</p>
                </Card>
                <Card className="p-6 border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">Output</h4>
                  <p className="text-muted-foreground text-sm">Completed tasks and collaborative insights</p>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Code Example</h3>
              <Card className="p-6 bg-muted/50 border border-border/50">
                <pre className="text-sm text-foreground overflow-x-auto">
                  <code>{`# LangGraph Example
from langgraph import StateGraph, END

def research_agent(state):
    # Research task implementation
    return {"research_data": "findings"}

def analysis_agent(state):
    # Analysis task implementation 
    return {"analysis": "insights"}

workflow = StateGraph()
workflow.add_node("researcher", research_agent)
workflow.add_node("analyzer", analysis_agent)
workflow.add_edge("researcher", "analyzer")
workflow.add_edge("analyzer", END)`}</code>
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
                  "Scalable agent coordination",
                  "Specialized role assignments",
                  "Parallel task processing",
                  "Fault-tolerant execution",
                  "Dynamic workflow adaptation"
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
                  "Multi-agent customer service",
                  "Collaborative research",
                  "Distributed content creation",
                  "Workflow automation",
                  "Enterprise decision support"
                ].map((useCase) => (
                  <Badge key={useCase} variant="outline" className="block text-center py-2">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6 border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Getting Started</h3>
              <div className="space-y-4">
                {[
                  "Install Framework",
                  "Define Agent Roles", 
                  "Set Up Coordination",
                  "Implement Workflows"
                ].map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-background text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-muted-foreground text-sm">{step}</span>
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

export default AgenticFrameworks;