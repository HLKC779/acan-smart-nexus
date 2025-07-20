import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Zap
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

  const handleLearnMore = (useCaseId: string) => {
    setSelectedUseCase(selectedUseCase === useCaseId ? null : useCaseId);
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
                    <div className="flex flex-wrap gap-1">
                      {useCase.components.map((component, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="text-xs bg-primary/10 text-primary border-primary/20"
                        >
                          {component}
                        </Badge>
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