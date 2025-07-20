import HeroSection from "@/components/HeroSection";
import ComponentsGrid from "@/components/ComponentsGrid";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <HeroSection />
      <ComponentsGrid />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default Index;
