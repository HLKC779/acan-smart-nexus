import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onViewComponentsClick: () => void;
}

const HeroSection = ({ onExploreClick, onViewComponentsClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-mesh"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-agent-blue/8 rounded-full animate-float-slow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-agent-cyan/10 rounded-full animate-float blur-2xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-agent-purple/12 rounded-full animate-float blur-xl" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-agent-green/6 rounded-full animate-float-slow blur-2xl" style={{animationDelay: '3s'}}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-agent-blue rounded-full animate-bounce-subtle opacity-60" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-agent-cyan rounded-full animate-bounce-subtle opacity-50" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-40 left-1/4 w-2 h-2 bg-agent-purple rounded-full animate-bounce-subtle opacity-70" style={{animationDelay: '2.5s'}}></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Hero Icon with enhanced styling */}
        <div className="mb-8 inline-block animate-scale-in">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-floating animate-glow-pulse">
              <Bot className="w-12 h-12 text-background" />
            </div>
            {/* Decorative rings */}
            <div className="absolute -inset-4 border border-agent-blue/20 rounded-full animate-spin-slow"></div>
            <div className="absolute -inset-8 border border-agent-cyan/10 rounded-full animate-spin-slow" style={{animationDirection: 'reverse'}}></div>
          </div>
        </div>

        {/* Hero Title with enhanced typography */}
        <h1 className="text-6xl md:text-8xl font-bold font-inter mb-8 animate-slide-up leading-tight">
          <span className="text-foreground block mb-2">Scalable</span>
          <span className="bg-gradient-text bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift block mb-2">
            AI Agent
          </span>
          <span className="text-foreground block">Systems</span>
        </h1>

        {/* Enhanced subtitle with better spacing */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-up" style={{animationDelay: '0.3s'}}>
          Complete architecture guide for building intelligent, distributed AI agents 
          with advanced reasoning, memory, and multi-modal capabilities
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-up" style={{animationDelay: '0.5s'}}>
          {['Multi-Modal AI', 'Distributed Systems', 'Advanced Reasoning', 'Memory Management'].map((feature, index) => (
            <span 
              key={feature}
              className="px-4 py-2 bg-card/50 border border-border rounded-full text-sm text-muted-foreground backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105"
              style={{animationDelay: `${0.7 + index * 0.1}s`}}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-up" style={{animationDelay: '0.9s'}}>
          <Button 
            size="lg" 
            onClick={onExploreClick}
            className="group bg-gradient-primary hover:shadow-neon transition-all duration-500 text-lg px-10 py-5 h-auto font-semibold rounded-xl hover:scale-105 relative overflow-hidden"
          >
            <span className="relative z-10">Explore Architecture</span>
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onViewComponentsClick}
            className="group border-2 border-border hover:border-agent-blue/50 hover:bg-card/50 backdrop-blur-sm text-lg px-10 py-5 h-auto font-semibold rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-floating"
          >
            <span className="group-hover:text-agent-blue transition-colors duration-300">View Components</span>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle" style={{animationDelay: '1.2s'}}>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-agent-blue rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;