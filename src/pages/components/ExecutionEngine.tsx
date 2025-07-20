import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, ExternalLink, CheckCircle } from "lucide-react";

const ExecutionEngine = () => {
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
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Zap className="h-6 w-6 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold">Execution Engine</h1>
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
                  Robust task execution with error handling, retries, and performance optimization for reliable agent operations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  The execution engine manages task execution, error handling, and performance optimization. It provides reliable execution guarantees, automatic retries, parallel processing, and resource optimization for agent operations.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Task Control", "Retries", "Async Ops", "Optimization"].map((feature) => (
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
                    "Reliable execution",
                    "Error resilience", 
                    "Performance optimization",
                    "Scalable processing",
                    "Resource management"
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
                    <p className="text-sm text-muted-foreground">Task queues and execution requests</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Processing</h4>
                    <p className="text-sm text-muted-foreground">Task scheduling, execution, and error handling</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Output</h4>
                    <p className="text-sm text-muted-foreground">Completed tasks and execution results</p>
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
                  <code>{`# Execution Engine Example
import asyncio
from tenacity import retry, stop_after_attempt

class ExecutionEngine:
    @retry(stop=stop_after_attempt(3))
    async def execute_task(self, task):
        try:
            result = await self.process_task(task)
            return result
        except Exception as e:
            self.log_error(e)
            raise
    
    async def execute_parallel(self, tasks):
        results = await asyncio.gather(
            *[self.execute_task(task) for task in tasks],
            return_exceptions=True
        )
        return results`}</code>
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
                  "Workflow automation",
                  "Batch processing",
                  "Real-time task execution",
                  "Error recovery",
                  "Performance optimization"
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
                  { step: "Design Task Model", description: "Define task structure and execution requirements" },
                  { step: "Implement Scheduler", description: "Build task scheduling and queuing mechanisms" },
                  { step: "Add Error Handling", description: "Implement retry logic and error recovery" },
                  { step: "Optimize Performance", description: "Add performance monitoring and optimization" }
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

export default ExecutionEngine;