import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Code, 
  BookOpen, 
  Download,
  Star,
  GitBranch
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'documentation' | 'tutorial' | 'example' | 'tool';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  url?: string;
  downloads?: number;
  stars?: number;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'LangGraph Quick Start Guide',
    description: 'Learn how to build your first scalable task graph with LangGraph framework.',
    type: 'tutorial',
    difficulty: 'beginner',
    tags: ['LangGraph', 'Getting Started', 'Task Graphs'],
    downloads: 1200,
    stars: 89
  },
  {
    id: '2',
    title: 'CrewAI Multi-Agent Documentation',
    description: 'Complete reference for implementing role-based agent systems using CrewAI.',
    type: 'documentation',
    difficulty: 'intermediate',
    tags: ['CrewAI', 'Multi-Agent', 'Roles'],
    downloads: 800,
    stars: 156
  },
  {
    id: '3',
    title: 'Memory System Implementation',
    description: 'Advanced tutorial on implementing hybrid memory systems with MemGPT and vector databases.',
    type: 'example',
    difficulty: 'advanced',
    tags: ['Memory', 'MemGPT', 'Vector DB'],
    downloads: 650,
    stars: 234
  },
  {
    id: '4',
    title: 'Reasoning Framework Comparison',
    description: 'Comprehensive analysis of ReAct, Reflexion, and Tree of Thought approaches.',
    type: 'documentation',
    difficulty: 'intermediate',
    tags: ['ReAct', 'Reasoning', 'Comparison'],
    downloads: 920,
    stars: 178
  },
  {
    id: '5',
    title: 'Tool Integration Toolkit',
    description: 'Ready-to-use tools for API integration and function calling in agent systems.',
    type: 'tool',
    difficulty: 'beginner',
    tags: ['Tools', 'API', 'Integration'],
    downloads: 1500,
    stars: 312
  },
  {
    id: '6',
    title: 'Monitoring & Observability Setup',
    description: 'Step-by-step guide to implement monitoring with Helicone and LangFuse.',
    type: 'tutorial',
    difficulty: 'intermediate',
    tags: ['Monitoring', 'Helicone', 'LangFuse'],
    downloads: 720,
    stars: 145
  }
];

const ResourcesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const { toast } = useToast();

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesType && matchesDifficulty;
  });

  const handleDownload = (resource: Resource) => {
    toast({
      title: "Download Started",
      description: `Downloading ${resource.title}...`,
    });
  };

  const typeColors = {
    documentation: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    tutorial: 'bg-green-500/20 text-green-400 border-green-500/30',
    example: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    tool: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  };

  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-400',
    intermediate: 'bg-yellow-500/20 text-yellow-400',
    advanced: 'bg-red-500/20 text-red-400'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-inter">
            Resources & Documentation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources, tutorials, tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="documentation">Documentation</option>
                <option value="tutorial">Tutorials</option>
                <option value="example">Examples</option>
                <option value="tool">Tools</option>
              </select>
              
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-md text-sm"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="max-h-96 overflow-y-auto space-y-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="p-4 bg-background/50 rounded-lg border border-border/50 hover:border-border transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{resource.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {resource.downloads && (
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {resource.downloads}
                      </span>
                    )}
                    {resource.stars && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {resource.stars}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-3">{resource.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={typeColors[resource.type]}>
                      {resource.type}
                    </Badge>
                    <Badge variant="outline" className={difficultyColors[resource.difficulty]}>
                      {resource.difficulty}
                    </Badge>
                    <div className="flex gap-1">
                      {resource.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(resource)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No resources found matching your criteria.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResourcesModal;