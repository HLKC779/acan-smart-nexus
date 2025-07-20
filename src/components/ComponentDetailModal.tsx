import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  ExternalLink, 
  Code, 
  BookOpen, 
  Play,
  Copy,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Target,
  Cpu
} from "lucide-react";
import { ComponentData } from "@/data/componentData";
import { useToast } from "@/hooks/use-toast";

interface ComponentDetailModalProps {
  component: ComponentData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ComponentDetailModal = ({ component, isOpen, onClose }: ComponentDetailModalProps) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const { toast } = useToast();

  if (!component) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    toast({
      title: "Copied!",
      description: "Code example copied to clipboard",
    });
  };

  const handleStartDemo = () => {
    toast({
      title: "Demo Starting",
      description: `Interactive demo for ${component.title} is loading...`,
    });
  };

  const colorMap = {
    blue: {
      gradient: 'from-agent-blue/20 to-agent-blue/5',
      iconBg: 'bg-agent-blue/20',
      iconColor: 'text-agent-blue',
      badge: 'bg-agent-blue/20 text-agent-blue border-agent-blue/30'
    },
    cyan: {
      gradient: 'from-agent-cyan/20 to-agent-cyan/5',
      iconBg: 'bg-agent-cyan/20',
      iconColor: 'text-agent-cyan',
      badge: 'bg-agent-cyan/20 text-agent-cyan border-agent-cyan/30'
    },
    purple: {
      gradient: 'from-agent-purple/20 to-agent-purple/5',
      iconBg: 'bg-agent-purple/20',
      iconColor: 'text-agent-purple',
      badge: 'bg-agent-purple/20 text-agent-purple border-agent-purple/30'
    },
    green: {
      gradient: 'from-agent-green/20 to-agent-green/5',
      iconBg: 'bg-agent-green/20',
      iconColor: 'text-agent-green',
      badge: 'bg-agent-green/20 text-agent-green border-agent-green/30'
    },
    orange: {
      gradient: 'from-agent-orange/20 to-agent-orange/5',
      iconBg: 'bg-agent-orange/20',
      iconColor: 'text-agent-orange',
      badge: 'bg-agent-orange/20 text-agent-orange border-agent-orange/30'
    }
  };

  const colors = colorMap[component.color];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-card border-border">
        <DialogHeader className="border-b border-border/50 pb-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
              <component.icon className={`w-6 h-6 ${colors.iconColor}`} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold font-inter">
                {component.title}
              </DialogTitle>
              <p className="text-muted-foreground">{component.description}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="code">Code Example</TabsTrigger>
              <TabsTrigger value="getting-started">Get Started</TabsTrigger>
              <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Detailed Description */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  About This Component
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {component.detailedDescription}
                </p>
                
                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {component.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className={colors.badge}>
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Benefits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {component.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Use Cases */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Use Cases
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {component.useCases.map((useCase, index) => (
                    <div key={index} className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{useCase}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Integrations */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-3">Popular Integrations</h3>
                <div className="flex flex-wrap gap-2">
                  {component.integrations.map((integration, index) => (
                    <Badge key={index} variant="outline" className="bg-muted/50">
                      {integration}
                    </Badge>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="architecture" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Cpu className="w-5 h-5 mr-2 text-primary" />
                  System Architecture
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-green-500/20 to-green-500/5 rounded-lg border border-green-500/20">
                      <h4 className="font-semibold text-green-400 mb-2">Input</h4>
                      <p className="text-sm text-muted-foreground">{component.architecture.input}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-blue-500/20 to-blue-500/5 rounded-lg border border-blue-500/20">
                      <h4 className="font-semibold text-blue-400 mb-2">Processing</h4>
                      <p className="text-sm text-muted-foreground">{component.architecture.processing}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-purple-500/20 to-purple-500/5 rounded-lg border border-purple-500/20">
                      <h4 className="font-semibold text-purple-400 mb-2">Output</h4>
                      <p className="text-sm text-muted-foreground">{component.architecture.output}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="code" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Code className="w-5 h-5 mr-2 text-primary" />
                    Code Example
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(component.codeExample)}
                    className="flex items-center gap-2"
                  >
                    {copiedCode ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copiedCode ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                  <pre className="text-sm text-foreground overflow-x-auto">
                    <code>{component.codeExample}</code>
                  </pre>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="getting-started" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-primary" />
                  Getting Started Guide
                </h3>
                <div className="space-y-4">
                  {component.gettingStarted.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-background font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{step.step}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="demo" className="space-y-6">
              <Card className="p-6 text-center">
                <div className={`w-16 h-16 ${colors.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <Play className={`w-8 h-8 ${colors.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Demo</h3>
                <p className="text-muted-foreground mb-6">
                  Try out {component.title} with our interactive demonstration
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={handleStartDemo}
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Interactive Demo
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Demo environment will open in a new window
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t border-border/50 pt-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Documentation
            </Button>
            <Button variant="outline" size="sm">
              <Code className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComponentDetailModal;