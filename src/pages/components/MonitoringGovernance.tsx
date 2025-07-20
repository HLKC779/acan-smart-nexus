import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, ExternalLink, CheckCircle } from "lucide-react";

const MonitoringGovernance = () => {
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
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Shield className="h-6 w-6 text-cyan-500" />
              </div>
              <h1 className="text-2xl font-bold">Monitoring & Governance</h1>
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
                  Complete observability with token tracking, behavior monitoring, and compliance controls for enterprise deployment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Monitoring and governance provides comprehensive oversight of AI agent operations. It includes usage tracking, behavior analysis, compliance monitoring, and security controls for enterprise-grade deployments.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Token Tracking", "Behavior Monitoring", "Compliance", "Helicone"].map((feature) => (
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
                    "Complete visibility",
                    "Compliance assurance",
                    "Performance insights",
                    "Cost control",
                    "Security monitoring"
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
                    <p className="text-sm text-muted-foreground">Agent operations and system events</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Processing</h4>
                    <p className="text-sm text-muted-foreground">Metrics collection, analysis, and alerting</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Output</h4>
                    <p className="text-sm text-muted-foreground">Dashboards, reports, and compliance data</p>
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
                  <code>{`# Monitoring Example
from helicone import Helicone

# Initialize monitoring
helicone = Helicone(api_key="your_key")

@helicone.monitor
def ai_agent_call(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        metadata={
            "user_id": "user123",
            "session_id": "session456"
        }
    )
    return response

# Track metrics
helicone.log_metrics({
    "tokens_used": 150,
    "response_time": 2.3,
    "cost": 0.003
})`}</code>
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
                  "Usage analytics",
                  "Compliance monitoring",
                  "Performance tracking",
                  "Security auditing",
                  "Cost optimization"
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
                  { step: "Set Up Monitoring", description: "Configure monitoring tools and data collection" },
                  { step: "Define Metrics", description: "Establish key performance indicators and tracking" },
                  { step: "Create Dashboards", description: "Build visualization and reporting interfaces" },
                  { step: "Set Alerts", description: "Configure alerts for anomalies and thresholds" }
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

export default MonitoringGovernance;