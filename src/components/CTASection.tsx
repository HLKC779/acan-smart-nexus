import { Button } from "@/components/ui/button";
import { ArrowRight, Github, BookOpen } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-accent/10 via-background to-primary/5">
      <div className="max-w-4xl mx-auto text-center">
        {/* CTA Content */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-inter mb-6">
            <span className="text-foreground">Ready to Build</span>{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Your AI Agent?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start implementing these architectural patterns in your next project. 
            Build intelligent, scalable AI systems that can adapt and learn.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-4 h-auto font-medium group"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-border hover:bg-accent/50 text-lg px-8 py-4 h-auto font-medium transition-all duration-300"
          >
            <Github className="mr-2 w-5 h-5" />
            View on GitHub
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-border hover:bg-accent/50 text-lg px-8 py-4 h-auto font-medium transition-all duration-300"
          >
            <BookOpen className="mr-2 w-5 h-5" />
            Documentation
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">10+</div>
            <div className="text-muted-foreground">Core Components</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">Enterprise</div>
            <div className="text-muted-foreground">Grade Architecture</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">Scalable</div>
            <div className="text-muted-foreground">Cloud-Edge Hybrid</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;