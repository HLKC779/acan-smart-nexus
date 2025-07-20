import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ComponentsGrid from "@/components/ComponentsGrid";
import FeaturesSection from "@/components/FeaturesSection";
import ExamplesSection from "@/components/ExamplesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ResourcesModal from "@/components/ResourcesModal";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleExploreArchitecture = () => {
    scrollToSection('components');
  };

  const handleViewComponents = () => {
    scrollToSection('components');
  };

  const handleGetStarted = () => {
    toast({
      title: "Get Started",
      description: "Welcome to AI Agent Systems! Check out our components and examples below.",
    });
    scrollToSection('examples');
  };

  const handleDocumentation = () => {
    setIsResourcesModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      
      <div id="hero">
        <HeroSection 
          onExploreClick={handleExploreArchitecture}
          onViewComponentsClick={handleViewComponents}
        />
      </div>
      
      <div id="components">
        <ComponentsGrid />
      </div>
      
      <div id="features">
        <FeaturesSection />
      </div>
      
      <div id="examples">
        <ExamplesSection />
      </div>
      
      <div id="cta">
        <CTASection 
          onGetStartedClick={handleGetStarted}
          onDocumentationClick={handleDocumentation}
        />
      </div>

      <Footer />

      <ResourcesModal 
        isOpen={isResourcesModalOpen} 
        onClose={() => setIsResourcesModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
