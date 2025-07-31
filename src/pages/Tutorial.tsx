import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Play, 
  Brain, 
  Network, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight,
  CheckCircle,
  PlayCircle,
  BookOpen,
  Target,
  Settings,
  BarChart3,
  MessageSquare,
  Lightbulb
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Tutorial = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const useCases = [
    {
      title: "Customer Service Automation",
      description: "Deploy AI agents that learn from customer interactions and improve response quality over time",
      icon: <MessageSquare className="w-6 h-6" />,
      benefits: ["24/7 availability", "Consistent responses", "Continuous learning", "Scalable support"],
      example: "E-commerce platform reduces response time by 80% while maintaining 95% customer satisfaction"
    },
    {
      title: "Content Personalization",
      description: "Create agents that adapt content recommendations based on user behavior and feedback",
      icon: <Target className="w-6 h-6" />,
      benefits: ["Higher engagement", "Better conversion rates", "Adaptive learning", "Real-time optimization"],
      example: "News platform increases user engagement by 150% with personalized content curation"
    },
    {
      title: "Process Optimization",
      description: "Implement agents that monitor and optimize business processes automatically",
      icon: <TrendingUp className="w-6 h-6" />,
      benefits: ["Reduced costs", "Improved efficiency", "Predictive insights", "Automated optimization"],
      example: "Manufacturing company reduces waste by 30% through intelligent process monitoring"
    },
    {
      title: "Intelligent Monitoring",
      description: "Deploy agents that monitor systems and adapt responses based on performance patterns",
      icon: <BarChart3 className="w-6 h-6" />,
      benefits: ["Proactive alerts", "Pattern recognition", "Automated responses", "Predictive maintenance"],
      example: "IT infrastructure achieves 99.9% uptime with predictive monitoring agents"
    }
  ];

  const tutorialSteps = [
    {
      title: "Understanding the System",
      description: "Learn about reinforcement learning and multi-agent systems",
      content: "Our AI agent system uses reinforcement learning to create agents that improve over time through feedback and experience.",
      action: "Explore System Architecture",
      route: "/rl-agent-management"
    },
    {
      title: "Setting Up Your First Agent",
      description: "Create and configure your first AI agent",
      content: "Navigate to the Agent Management dashboard to create your first intelligent agent with custom objectives.",
      action: "Go to Agent Management",
      route: "/rl-agent-management"
    },
    {
      title: "Training and Optimization",
      description: "Start training sessions and monitor performance",
      content: "Use the training interface to begin agent learning sessions and track performance metrics in real-time.",
      action: "Start Training Session",
      route: "/rl-agent-management"
    },
    {
      title: "Advanced Features",
      description: "Explore intelligent agents and RAG capabilities",
      content: "Discover advanced features like knowledge base integration and intelligent reasoning frameworks.",
      action: "Explore Advanced Features",
      route: "/intelligent-agents"
    },
    {
      title: "Integration & Deployment",
      description: "Deploy your agents and integrate with existing systems",
      content: "Learn how to deploy trained agents and integrate them with your existing infrastructure.",
      action: "View Integration Guide",
      route: "/rl-agent-management"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <PlayCircle className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">AI Agent System Tutorial</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8">
              Learn how to build, train, and deploy scalable AI agents that improve over time
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" onClick={() => {
                setCurrentStep(0);
                setActiveTab("getting-started");
              }} className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Start Tutorial
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/rl-agent-management')}>
                <Brain className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">What is a Scalable AI Agent System?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A revolutionary platform that combines reinforcement learning, multi-agent coordination, 
                and adaptive intelligence to create AI systems that learn and improve autonomously.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Brain className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Reinforcement Learning</CardTitle>
                  <CardDescription>
                    Agents learn through trial and error, improving their performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Continuous improvement
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Adaptive behavior
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Self-optimization
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Network className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Multi-Agent Systems</CardTitle>
                  <CardDescription>
                    Multiple agents work together, sharing knowledge and coordinating actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Collaborative intelligence
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Distributed processing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Scalable architecture
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Real-time Adaptation</CardTitle>
                  <CardDescription>
                    Agents adapt to changing conditions and learn from feedback instantly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Instant feedback processing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Dynamic optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Contextual awareness
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Use Cases Tab */}
          <TabsContent value="use-cases" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Real-World Applications</h2>
              <p className="text-lg text-muted-foreground">
                Discover how businesses are using AI agents to transform their operations
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {useCase.icon}
                      <CardTitle>{useCase.title}</CardTitle>
                    </div>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="secondary">{benefit}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm italic">"{useCase.example}"</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Getting Started Tab */}
          <TabsContent value="getting-started" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Step-by-Step Guide</h2>
              <p className="text-lg text-muted-foreground">
                Follow these steps to create and deploy your first AI agent
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {tutorialSteps.map((step, index) => (
                <Card key={index} className={`mb-4 ${currentStep === index ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          currentStep >= index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </div>
                      </div>
                      {currentStep === index && (
                        <Badge variant="default">Current Step</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{step.content}</p>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => navigate(step.route)}
                        className="flex items-center gap-2"
                      >
                        {step.action}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      {index < tutorialSteps.length - 1 && (
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentStep(index + 1)}
                        >
                          Next Step
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
              <p className="text-lg text-muted-foreground">
                Explore sophisticated capabilities for enterprise-grade AI systems
              </p>
            </div>

            <Accordion type="single" collapsible className="max-w-4xl mx-auto">
              <AccordionItem value="rag">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    Knowledge Base Integration (RAG)
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>Integrate your agents with knowledge bases using Retrieval-Augmented Generation (RAG):</p>
                    <ul className="space-y-2 ml-4">
                      <li>• Upload documents and create searchable knowledge bases</li>
                      <li>• Enable agents to query and use contextual information</li>
                      <li>• Improve response accuracy with domain-specific knowledge</li>
                      <li>• Real-time knowledge updates and versioning</li>
                    </ul>
                    <Button onClick={() => navigate('/intelligent-agents')} className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Explore Knowledge Base
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="frameworks">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5" />
                    Reasoning Frameworks
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>Implement advanced reasoning capabilities in your agents:</p>
                    <ul className="space-y-2 ml-4">
                      <li>• Chain-of-thought reasoning for complex problem solving</li>
                      <li>• Multi-step planning and execution</li>
                      <li>• Causal reasoning and inference</li>
                      <li>• Meta-learning and transfer learning capabilities</li>
                    </ul>
                    <Button onClick={() => navigate('/components/reasoning-frameworks')} className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      View Reasoning Components
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="monitoring">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5" />
                    Monitoring & Governance
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>Ensure reliable and ethical AI operations:</p>
                    <ul className="space-y-2 ml-4">
                      <li>• Real-time performance monitoring and alerts</li>
                      <li>• Bias detection and fairness metrics</li>
                      <li>• Explainable AI and decision transparency</li>
                      <li>• Compliance tracking and audit trails</li>
                    </ul>
                    <Button onClick={() => navigate('/components/monitoring-governance')} className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      View Monitoring Tools
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="optimization">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5" />
                    Performance Optimization
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p>Optimize your AI agents for maximum efficiency:</p>
                    <ul className="space-y-2 ml-4">
                      <li>• Automated hyperparameter tuning</li>
                      <li>• Resource allocation and scaling</li>
                      <li>• Model compression and quantization</li>
                      <li>• Distributed training and inference</li>
                    </ul>
                    <Button onClick={() => navigate('/components/performance-optimization')} className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Explore Optimization
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Ready to Build Your First AI Agent?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start creating intelligent agents that learn and adapt to your specific needs. 
            No complex setup required - begin building in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/rl-agent-management')} className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Start Building Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/intelligent-agents')}>
              <Users className="w-4 h-4 mr-2" />
              Explore Examples
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;