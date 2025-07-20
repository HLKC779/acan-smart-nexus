import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon, ArrowRight, ExternalLink } from "lucide-react";
import { ComponentData } from "@/data/componentData";

interface ComponentCardProps {
  component: ComponentData;
  onLearnMore: (component: ComponentData) => void;
  className?: string;
}

const colorMap = {
  blue: {
    gradient: 'from-agent-blue/20 to-agent-blue/5',
    iconBg: 'bg-agent-blue/20',
    iconColor: 'text-agent-blue',
    badge: 'bg-agent-blue/20 text-agent-blue border-agent-blue/30'
  },
  cyan: {
    gradient: 'from-agent-cyan/20 to-agent-cyan/5',
    iconBg: 'bg-agent-cyan/20',
    iconColor: 'text-agent-cyan',
    badge: 'bg-agent-cyan/20 text-agent-cyan border-agent-cyan/30'
  },
  purple: {
    gradient: 'from-agent-purple/20 to-agent-purple/5',
    iconBg: 'bg-agent-purple/20',
    iconColor: 'text-agent-purple',
    badge: 'bg-agent-purple/20 text-agent-purple border-agent-purple/30'
  },
  green: {
    gradient: 'from-agent-green/20 to-agent-green/5',
    iconBg: 'bg-agent-green/20',
    iconColor: 'text-agent-green',
    badge: 'bg-agent-green/20 text-agent-green border-agent-green/30'
  },
  orange: {
    gradient: 'from-agent-orange/20 to-agent-orange/5',
    iconBg: 'bg-agent-orange/20',
    iconColor: 'text-agent-orange',
    badge: 'bg-agent-orange/20 text-agent-orange border-agent-orange/30'
  }
};

const ComponentCard = ({ component, onLearnMore, className = "" }: ComponentCardProps) => {
  const colors = colorMap[component.color];
  const Icon = component.icon;

  return (
    <Card className={`p-6 bg-gradient-to-br ${colors.gradient} border-border/50 hover:border-border transition-all duration-300 hover:shadow-card group cursor-pointer ${className}`}>
      {/* Icon */}
      <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 ${colors.iconColor}`} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold font-inter mb-3 text-foreground">
        {component.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {component.description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-4">
        {component.features.slice(0, 4).map((feature, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className={`${colors.badge} text-xs font-medium`}
          >
            {feature}
          </Badge>
        ))}
        {component.features.length > 4 && (
          <Badge variant="outline" className="text-xs font-medium bg-muted/50">
            +{component.features.length - 4} more
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto">
        <Button
          onClick={() => onLearnMore(component)}
          className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300 group"
          size="sm"
        >
          Learn More
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-accent/50 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://docs.example.com/${component.id}`, '_blank');
          }}
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ComponentCard;