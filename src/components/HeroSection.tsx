import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onViewComponentsClick: () => void;
}

const HeroSection = ({ onExploreClick, onViewComponentsClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-agent-blue/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-agent-cyan/10 rounded-full animate-float blur-xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-agent-purple/10 rounded-full animate-float blur-xl" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Hero Icon */}
        <div className="mb-8 inline-block">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow animate-glow">
            <Bot className="w-10 h-10 text-background" />
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-bold font-inter mb-6 animate-fade-in">
          <span className="text-foreground">Scalable</span>{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            AI Agent
          </span>{" "}
          <span className="text-foreground">Systems</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
          Complete architecture guide for building intelligent, distributed AI agents 
          with advanced reasoning, memory, and multi-modal capabilities
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.4s'}}>
          <Button 
            size="lg" 
            onClick={onExploreClick}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-4 h-auto font-medium"
          >
            Explore Architecture
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onViewComponentsClick}
            className="border-border hover:bg-accent/50 text-lg px-8 py-4 h-auto font-medium transition-all duration-300"
          >
            View Components
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;