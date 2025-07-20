import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cloud, ExternalLink, CheckCircle } from "lucide-react";

const DeploymentOrchestration = () => {
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
                <Cloud className="h-6 w-6 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold">Deployment & Orchestration</h1>
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
                  Scalable deployment solutions with container orchestration, load balancing, and auto-scaling for production environments.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Deployment and orchestration enables scalable, reliable deployment of AI agent systems. It provides container management, service discovery, load balancing, and auto-scaling capabilities for production environments.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "Kubernetes", "Load Balancing", "Auto-scaling"].map((feature) => (
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
                    "Container management",
                    "Service discovery",
                    "Load balancing",
                    "Auto-scaling",
                    "Health monitoring"
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
                    <p className="text-sm text-muted-foreground">Application containers and configuration</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Processing</h4>
                    <p className="text-sm text-muted-foreground">Container orchestration and service management</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Output</h4>
                    <p className="text-sm text-muted-foreground">Scalable production deployments</p>
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
                  <code>{`# Kubernetes Deployment Example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-agent-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-agent
  template:
    metadata:
      labels:
        app: ai-agent
    spec:
      containers:
      - name: ai-agent
        image: ai-agent:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"`}</code>
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
                  "Production deployments",
                  "Multi-environment management",
                  "Blue-green deployments",
                  "Canary releases",
                  "Disaster recovery"
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
                  { step: "Containerize Application", description: "Create Docker containers for your AI agents" },
                  { step: "Set Up Orchestration", description: "Configure Kubernetes or similar orchestration platform" },
                  { step: "Define Services", description: "Create service definitions and networking" },
                  { step: "Configure Scaling", description: "Set up auto-scaling and load balancing rules" }
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

export default DeploymentOrchestration;