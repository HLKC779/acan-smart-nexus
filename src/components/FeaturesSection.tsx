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
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-inter mb-6">
            <span className="text-foreground">Key</span>{" "}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
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
              className="animate-fade-in"
              style={{animationDelay: `${index * 0.15}s`}}
            >
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card group">
                {/* Feature Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-background" />
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {feature.highlight}
                  </Badge>
                </div>

                {/* Feature Content */}
                <h3 className="text-xl font-semibold font-inter mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;