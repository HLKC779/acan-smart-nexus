import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Zap, 
  Shield, 
  Layers, 
  Globe, 
  Eye, 
  Cpu 
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Multi-Agent Orchestration",
    description: "Coordinate specialized agents with role-based task distribution and collaborative problem-solving capabilities.",
    highlight: "Enterprise Scale"
  },
  {
    icon: Shield,
    title: "Privacy-Preserving Learning",
    description: "Federated learning with differential privacy techniques for collective intelligence without data exposure.",
    highlight: "Secure"
  },
  {
    icon: Cpu,
    title: "Hybrid Reasoning",
    description: "Combines neural network pattern recognition with symbolic logical reasoning for robust decisions.",
    highlight: "Advanced AI"
  },
  {
    icon: Eye,
    title: "Explainable Decisions",
    description: "Complete transparency through attention visualization and natural language explanations.",
    highlight: "Transparent"
  },
  {
    icon: Zap,
    title: "Real-time Optimization",
    description: "Quantum-inspired algorithms for complex problem-solving and dynamic resource allocation.",
    highlight: "High Performance"
  },
  {
    icon: Globe,
    title: "Cloud-Edge Hybrid",
    description: "Automatically balance workload between cloud and edge computing for optimal performance.",
    highlight: "Scalable"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-agent-blue/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-agent-cyan/30 to-transparent"></div>
        <div className="absolute top-1/2 left-16 w-2 h-2 bg-agent-purple rounded-full animate-bounce-subtle opacity-60"></div>
        <div className="absolute top-1/4 right-20 w-1 h-1 bg-agent-green rounded-full animate-bounce-subtle opacity-50" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-secondary/10 border border-agent-purple/20 rounded-full text-sm text-agent-purple font-medium">
              Core Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-inter mb-6">
            <span className="text-foreground">Key</span>{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Advanced capabilities that make AI agent systems intelligent, secure, 
            and enterprise-ready for real-world deployment
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-slide-up group"
              style={{animationDelay: `${index * 0.15}s`}}
            >
              <Card className="p-8 h-full bg-card/30 backdrop-blur-sm border border-border/50 hover:border-agent-blue/40 transition-all duration-500 hover:shadow-floating group-hover:bg-card/60 relative overflow-hidden">
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Feature Badge */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                      <feature.icon className="w-7 h-7 text-background" />
                    </div>
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                  </div>
                  <Badge variant="outline" className="bg-agent-blue/10 text-agent-blue border-agent-blue/30 group-hover:bg-agent-blue/20 transition-colors duration-300">
                    {feature.highlight}
                  </Badge>
                </div>

                {/* Feature Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold font-inter mb-4 text-foreground group-hover:text-agent-blue transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom border gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-agent-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;