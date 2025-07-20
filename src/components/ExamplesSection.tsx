import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Stethoscope, 
  GraduationCap, 
  TrendingUp, 
  Car, 
  ArrowRight,
  Users,
  Brain,
  Shield,
  Zap,
  Cloud,
  Cpu,
  Gauge
} from "lucide-react";

const useCases = [
  {
    id: 'smart-city',
    icon: Building2,
    title: 'Smart City Management',
    description: 'Real-time traffic optimization, energy distribution, and emergency response coordination across metropolitan areas.',
    benefits: ['30% reduction in commute times', '25% decrease in energy consumption', 'Improved emergency response'],
    components: ['Distributed Cognitive Engines', 'Quantum Optimization', 'Cloud-Edge Hybrid'],
    color: 'blue' as const
  },
  {
    id: 'healthcare',
    icon: Stethoscope,
    title: 'Healthcare Diagnosis',
    description: 'AI-powered diagnostic assistance with ethical reasoning and privacy-preserved learning from global medical data.',
    benefits: ['Improved diagnostic accuracy', 'Ethical treatment recommendations', 'Privacy-protected learning'],
    components: ['Multi-Modal Interface', 'Neuro-Symbolic Integration', 'Ethical Framework'],
    color: 'green' as const
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Personalized Learning',
    description: 'Adaptive educational systems that create personalized curricula while protecting student privacy.',
    benefits: ['Personalized learning paths', 'Improved outcomes', 'Privacy protection'],
    components: ['Adaptive Task Decomposition', 'Federated Learning', 'Multi-Modal Interface'],
    color: 'purple' as const
  },
  {
    id: 'finance',
    icon: TrendingUp,
    title: 'Financial Risk Management',
    description: 'Intelligent trading systems with ethical decision-making and real-time market optimization.',
    benefits: ['Better risk assessment', 'Ethical trading decisions', 'Market optimization'],
    components: ['Quantum Optimization', 'Ethical Reasoning', 'Real-time Adaptation'],
    color: 'orange' as const
  },
  {
    id: 'autonomous',
    icon: Car,
    title: 'Autonomous Vehicle Network',
    description: 'Coordinated autonomous vehicle systems with ethical decision-making in emergency situations.',
    benefits: ['Safe navigation', 'Traffic coordination', 'Ethical emergency decisions'],
    components: ['Cloud-Edge Architecture', 'Ethical Framework', 'Real-time Processing'],
    color: 'cyan' as const
  }
];

const colorMap = {
  blue: 'from-agent-blue/20 to-agent-blue/5',
  cyan: 'from-agent-cyan/20 to-agent-cyan/5',
  purple: 'from-agent-purple/20 to-agent-purple/5',
  green: 'from-agent-green/20 to-agent-green/5',
  orange: 'from-agent-orange/20 to-agent-orange/5'
};

const ExamplesSection = () => {
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLearnMore = (useCaseId: string) => {
    setSelectedUseCase(selectedUseCase === useCaseId ? null : useCaseId);
  };

  const componentInfo = {
    'Cloud-Edge Architecture': {
      icon: Cloud,
      url: 'https://docs.lovable.dev/user-guides/quickstart',
      description: 'Hybrid computing architecture that seamlessly distributes workloads between cloud and edge devices for optimal performance and low latency.',
      features: ['Edge Processing', 'Cloud Coordination', 'Load Balancing', 'Real-time Sync']
    },
    'Ethical Framework': {
      icon: Shield,
      url: 'https://docs.lovable.dev/faq',
      description: 'Comprehensive ethical decision-making system that ensures AI agents make responsible choices aligned with human values and societal norms.',
      features: ['Bias Detection', 'Fair Decision Making', 'Transparency', 'Accountability']
    },
    'Real-time Processing': {
      icon: Gauge,
      url: 'https://docs.lovable.dev/user-guides/messaging-limits',
      description: 'Advanced processing engine capable of handling real-time data streams with ultra-low latency and high throughput requirements.',
      features: ['Stream Processing', 'Low Latency', 'High Throughput', 'Real-time Analytics']
    },
    'Quantum Optimization': {
      icon: Cpu,
      url: 'https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO',
      description: 'Quantum-inspired optimization algorithms for solving complex computational problems with unprecedented efficiency.',
      features: ['Complex Problem Solving', 'Resource Optimization', 'Parallel Processing', 'Enhanced Performance']
    },
    'Multi-Modal Interface': {
      icon: Brain,
      url: 'https://discord.com/channels/1119885301872070706/1280461670979993613',
      description: 'Advanced interface system that processes and understands multiple types of input including text, voice, images, and sensor data.',
      features: ['Text Processing', 'Voice Recognition', 'Image Analysis', 'Sensor Integration']
    },
    'Neuro-Symbolic Integration': {
      icon: Brain,
      url: 'https://docs.lovable.dev/',
      description: 'Hybrid AI approach combining neural networks with symbolic reasoning for enhanced understanding and explainability.',
      features: ['Neural Networks', 'Symbolic Reasoning', 'Knowledge Graphs', 'Explainable AI']
    },
    'Distributed Cognitive Engines': {
      icon: Brain,
      url: 'https://docs.lovable.dev/user-guides/quickstart',
      description: 'Distributed AI processing engines that enable intelligent decision-making across multiple nodes.',
      features: ['Distributed Processing', 'Cognitive Computing', 'Scalable Intelligence', 'Multi-node Coordination']
    },
    'Adaptive Task Decomposition': {
      icon: Brain,
      url: 'https://docs.lovable.dev/',
      description: 'Intelligent system that breaks down complex tasks into manageable components automatically.',
      features: ['Task Analysis', 'Adaptive Planning', 'Resource Allocation', 'Dynamic Optimization']
    },
    'Federated Learning': {
      icon: Shield,
      url: 'https://docs.lovable.dev/faq',
      description: 'Privacy-preserving machine learning that trains models across distributed data sources.',
      features: ['Privacy Protection', 'Distributed Training', 'Data Security', 'Collaborative Learning']
    },
    'Ethical Reasoning': {
      icon: Shield,
      url: 'https://docs.lovable.dev/faq',
      description: 'Advanced reasoning system that evaluates decisions based on ethical principles.',
      features: ['Moral Evaluation', 'Decision Ethics', 'Value Alignment', 'Responsible AI']
    },
    'Real-time Adaptation': {
      icon: Gauge,
      url: 'https://docs.lovable.dev/user-guides/messaging-limits',
      description: 'Dynamic system adaptation based on real-time environmental changes and requirements.',
      features: ['Environment Monitoring', 'Dynamic Adjustment', 'Performance Optimization', 'Reactive Systems']
    }
  };

  const handleComponentClick = (componentName: string) => {
    const info = componentInfo[componentName as keyof typeof componentInfo];
    if (info?.url) {
      window.open(info.url, '_blank');
    } else {
      // Fallback for components without specific URLs
      window.open('https://docs.lovable.dev/', '_blank');
    }
  };

  return (
    <section id="examples" className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-inter mb-6">
            <span className="text-foreground">Real-World</span>{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Applications
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how AI agent systems are transforming industries with intelligent automation, 
            ethical decision-making, and scalable architectures
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.id}
              className="animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <Card className={`p-6 h-full bg-gradient-to-br ${colorMap[useCase.color]} border-border/50 hover:border-border transition-all duration-300 hover:shadow-card group cursor-pointer`}>
                {/* Icon */}
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <useCase.icon className="w-6 h-6 text-background" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold font-inter mb-3 text-foreground">
                  {useCase.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Benefits */}
                {selectedUseCase === useCase.id && (
                  <div className="mb-4 animate-fade-in">
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-primary" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {useCase.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Components */}
                {selectedUseCase === useCase.id && (
                  <div className="mb-4 animate-fade-in">
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Brain className="w-4 h-4 mr-2 text-primary" />
                      Core Components
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {useCase.components.map((component, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={() => handleComponentClick(component)}
                          className="text-xs h-7 px-3 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-200 hover:scale-105"
                        >
                          {component}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Learn More Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLearnMore(useCase.id)}
                  className="w-full group-hover:bg-primary/10 transition-all duration-300"
                >
                  {selectedUseCase === useCase.id ? 'Show Less' : 'Learn More'}
                  <ArrowRight className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                    selectedUseCase === useCase.id ? 'rotate-90' : 'group-hover:translate-x-1'
                  }`} />
                </Button>
              </Card>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Users, value: '1M+', label: 'Agents Deployed' },
            { icon: Brain, value: '99.9%', label: 'Uptime' },
            { icon: Shield, value: '100%', label: 'Privacy Compliant' },
            { icon: Zap, value: '<10ms', label: 'Response Time' }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center animate-fade-in"
              style={{animationDelay: `${index * 0.1 + 0.5}s`}}
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-background" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;