import { useState } from "react";
import ComponentCard from "./ComponentCard";
import ComponentDetailModal from "./ComponentDetailModal";
import ComponentFilters from "./ComponentFilters";
import { componentsData, ComponentData } from "@/data/componentData";

const ComponentsGrid = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter components based on search and filters
  const filteredComponents = componentsData.filter(component => {
    const matchesSearch = searchTerm === '' || 
      component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesColor = selectedColor === null || component.color === selectedColor;
    
    return matchesSearch && matchesColor;
  });

  const handleLearnMore = (component: ComponentData) => {
    setSelectedComponent(component);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedComponent(null);
  };

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-agent-blue/20 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-agent-cyan/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-primary/10 border border-agent-blue/20 rounded-full text-sm text-agent-blue font-medium">
              System Architecture
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-inter mb-6">
            <span className="text-foreground">System</span>{" "}
            <span className="bg-gradient-text bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              Components
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Essential building blocks for creating intelligent, scalable AI agent systems 
            with enterprise-grade capabilities and performance
          </p>
        </div>

        {/* Filters */}
        <ComponentFilters
          onSearch={setSearchTerm}
          onFilterByColor={setSelectedColor}
          onFilterByCategory={setSelectedCategory}
          searchTerm={searchTerm}
          selectedColor={selectedColor}
          selectedCategory={selectedCategory}
        />

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredComponents.map((component, index) => (
            <div
              key={component.id}
              className="animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <ComponentCard
                component={component}
                onLearnMore={handleLearnMore}
              />
            </div>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No components found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Component Detail Modal */}
      <ComponentDetailModal
        component={selectedComponent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default ComponentsGrid;