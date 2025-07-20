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
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-inter mb-6">
            <span className="text-foreground">System</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
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