import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";

interface ComponentFiltersProps {
  onSearch: (term: string) => void;
  onFilterByColor: (color: string | null) => void;
  onFilterByCategory: (category: string | null) => void;
  searchTerm: string;
  selectedColor: string | null;
  selectedCategory: string | null;
}

const ComponentFilters = ({ 
  onSearch, 
  onFilterByColor, 
  onFilterByCategory,
  searchTerm,
  selectedColor,
  selectedCategory
}: ComponentFiltersProps) => {
  const colors = [
    { name: 'blue', label: 'Blue', class: 'bg-agent-blue/20 text-agent-blue border-agent-blue/30' },
    { name: 'cyan', label: 'Cyan', class: 'bg-agent-cyan/20 text-agent-cyan border-agent-cyan/30' },
    { name: 'purple', label: 'Purple', class: 'bg-agent-purple/20 text-agent-purple border-agent-purple/30' },
    { name: 'green', label: 'Green', class: 'bg-agent-green/20 text-agent-green border-agent-green/30' },
    { name: 'orange', label: 'Orange', class: 'bg-agent-orange/20 text-agent-orange border-agent-orange/30' }
  ];

  const categories = [
    'Core Infrastructure',
    'Data & Memory', 
    'Integration & APIs',
    'User Experience',
    'Operations & Deployment'
  ];

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearch('')}
            className="absolute right-1 top-1 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Color Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground mr-2">Filter by type:</span>
        {colors.map((color) => (
          <Button
            key={color.name}
            variant={selectedColor === color.name ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterByColor(selectedColor === color.name ? null : color.name)}
            className={`${selectedColor === color.name ? 'bg-primary' : color.class} transition-all duration-300`}
          >
            {color.label}
          </Button>
        ))}
      </div>

      {/* Active Filters */}
      {(selectedColor || selectedCategory || searchTerm) && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Search: "{searchTerm}"
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => onSearch('')}
              />
            </Badge>
          )}
          {selectedColor && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Color: {selectedColor}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => onFilterByColor(null)}
              />
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Category: {selectedCategory}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => onFilterByCategory(null)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default ComponentFilters;