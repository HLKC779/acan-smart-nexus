import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lightbulb, ExternalLink, CheckCircle } from "lucide-react";

const ReasoningFrameworks = () => {
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
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Lightbulb className="h-6 w-6 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold">Reasoning Frameworks</h1>
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
                  Sophisticated reasoning approaches for structured problem-solving and decision-making capabilities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Reasoning frameworks provide structured approaches to problem-solving and decision-making. These frameworks enable agents to think step-by-step, reflect on their actions, and explore multiple solution paths for complex tasks.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["ReAct", "Reflexion", "Plan-and-Solve", "Tree of Thought"].map((feature) => (
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
                    "Structured thinking",
                    "Self-improvement",
                    "Strategic planning", 
                    "Error correction",
                    "Transparent reasoning"
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
                    <p className="text-sm text-muted-foreground">Problems and decision scenarios</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Processing</h4>
                    <p className="text-sm text-muted-foreground">Structured reasoning, reflection, and planning</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Output</h4>
                    <p className="text-sm text-muted-foreground">Reasoned solutions and decision paths</p>
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
                  <code>{`# ReAct Framework Example
def react_agent(question):
    thought = f"I need to solve: {question}"
    
    # Reasoning step
    action = "search"
    observation = search_tool(question)
    
    # Reflection step  
    thought = f"Based on {observation}, I should..."
    action = "calculate"
    result = calculate_tool(observation)
    
    return {
        "thought": thought,
        "action": action, 
        "result": result
    }`}</code>
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
                  "Complex problem solving",
                  "Strategic planning",
                  "Decision optimization", 
                  "Multi-step reasoning",
                  "Error correction and learning"
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
                  { step: "Select Framework", description: "Choose the appropriate reasoning framework for your use case" },
                  { step: "Define Problem Types", description: "Categorize the types of problems your agents will solve" },
                  { step: "Implement Reasoning Loop", description: "Create the think-act-observe cycle for your agents" },
                  { step: "Add Reflection", description: "Implement self-reflection and improvement mechanisms" }
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

export default ReasoningFrameworks;