import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  CheckCircle,
  Settings,
  User,
  Bell,
  Download,
  Heart,
  Star,
  Zap,
  Shield,
  Copy,
  Code
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComponentExample {
  id: string;
  name: string;
  category: 'form' | 'layout' | 'navigation' | 'data' | 'feedback';
  description: string;
  code: string;
  preview: React.ReactNode;
  props?: { [key: string]: any };
}

const ComponentPreview = () => {
  const { toast } = useToast();
  const [selectedExample, setSelectedExample] = useState<string>("button-variants");
  const [copiedCode, setCopiedCode] = useState(false);

  const examples: ComponentExample[] = [
    {
      id: "button-variants",
      name: "Button Variants",
      category: "form",
      description: "Different button styles and states",
      code: `import { Button } from "@/components/ui/button";

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}`,
      preview: (
        <div className="flex flex-wrap gap-4 p-6">
          <Button className="bg-gradient-primary hover:shadow-glow">Default</Button>
          <Button variant="outline" className="hover:bg-agent-blue/10 hover:border-agent-blue/50">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost" className="hover:bg-agent-cyan/10">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
      )
    },
    {
      id: "interactive-cards",
      name: "Interactive Cards",
      category: "layout",
      description: "Hoverable cards with animations",
      code: `import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function InteractiveCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-6 hover:shadow-floating transition-all duration-300 group cursor-pointer">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg"></div>
          <div>
            <h3 className="font-semibold">Feature Card</h3>
            <Badge variant="outline">Premium</Badge>
          </div>
        </div>
        <p className="text-muted-foreground">
          This is an interactive card component with hover effects.
        </p>
      </Card>
    </div>
  );
}`,
      preview: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <Card className="p-6 hover:shadow-floating transition-all duration-500 group cursor-pointer hover:bg-card/80 border-border/50 hover:border-agent-blue/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform duration-300"></div>
              <div>
                <h3 className="font-semibold group-hover:text-agent-blue transition-colors">Feature Card</h3>
                <Badge variant="outline" className="bg-agent-blue/10 text-agent-blue border-agent-blue/30">Premium</Badge>
              </div>
            </div>
            <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
              This is an interactive card component with hover effects.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-floating transition-all duration-500 group cursor-pointer hover:bg-card/80 border-border/50 hover:border-agent-green/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-secondary rounded-lg group-hover:scale-110 transition-transform duration-300"></div>
              <div>
                <h3 className="font-semibold group-hover:text-agent-green transition-colors">Analytics Card</h3>
                <Badge variant="outline" className="bg-agent-green/10 text-agent-green border-agent-green/30">Popular</Badge>
              </div>
            </div>
            <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
              Advanced analytics with real-time updates and insights.
            </p>
          </Card>
        </div>
      )
    },
    {
      id: "icon-buttons",
      name: "Icon Buttons",
      category: "form",
      description: "Buttons with icons and animations",
      code: `import { Button } from "@/components/ui/button";
import { Download, Heart, Star, Settings } from "lucide-react";

export function IconButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button className="group">
        <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
        Download
      </Button>
      <Button variant="outline" className="group">
        <Heart className="w-4 h-4 mr-2 group-hover:text-red-500" />
        Like
      </Button>
      <Button variant="secondary" className="group">
        <Star className="w-4 h-4 mr-2 group-hover:text-yellow-500" />
        Favorite
      </Button>
    </div>
  );
}`,
      preview: (
        <div className="flex flex-wrap gap-4 p-6">
          <Button className="group bg-gradient-primary hover:shadow-glow">
            <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            Download
          </Button>
          <Button variant="outline" className="group hover:border-red-500/50">
            <Heart className="w-4 h-4 mr-2 group-hover:text-red-500 transition-colors" />
            Like
          </Button>
          <Button variant="secondary" className="group">
            <Star className="w-4 h-4 mr-2 group-hover:text-yellow-500 transition-colors" />
            Favorite
          </Button>
          <Button variant="ghost" className="group">
            <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Settings
          </Button>
        </div>
      )
    },
    {
      id: "badge-variants",
      name: "Badge Collection",
      category: "feedback",
      description: "Various badge styles and colors",
      code: `import { Badge } from "@/components/ui/badge";

export function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge>Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge className="bg-green-500">Success</Badge>
      <Badge className="bg-yellow-500">Warning</Badge>
    </div>
  );
}`,
      preview: (
        <div className="flex flex-wrap gap-3 p-6">
          <Badge className="bg-gradient-primary">Default</Badge>
          <Badge variant="outline" className="border-agent-blue/30 text-agent-blue">Outline</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge className="bg-gradient-accent text-background">Success</Badge>
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-background">Warning</Badge>
          <Badge className="bg-gradient-secondary text-background">Premium</Badge>
        </div>
      )
    },
    {
      id: "notification-cards",
      name: "Notification Cards",
      category: "feedback",
      description: "Notification and alert components",
      code: `import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, Zap } from "lucide-react";

export function NotificationCards() {
  return (
    <div className="space-y-4">
      <Card className="p-4 border-l-4 border-l-green-500">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <h4 className="font-medium">Success!</h4>
            <p className="text-sm text-muted-foreground">Your action was completed.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}`,
      preview: (
        <div className="space-y-4 p-6">
          <Card className="p-4 border-l-4 border-l-green-500 bg-green-500/5 hover:bg-green-500/10 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <h4 className="font-medium">Success!</h4>
                <p className="text-sm text-muted-foreground">Your action was completed successfully.</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-blue-500 bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-blue-500" />
              <div>
                <h4 className="font-medium">New Notification</h4>
                <p className="text-sm text-muted-foreground">You have a new message waiting.</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-l-4 border-l-purple-500 bg-purple-500/5 hover:bg-purple-500/10 transition-colors">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-500" />
              <div>
                <h4 className="font-medium">System Update</h4>
                <p className="text-sm text-muted-foreground">New features are now available.</p>
              </div>
            </div>
          </Card>
        </div>
      )
    }
  ];

  const selectedExampleData = examples.find(ex => ex.id === selectedExample);

  const copyCode = () => {
    if (selectedExampleData) {
      navigator.clipboard.writeText(selectedExampleData.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
      toast({
        title: "Code Copied",
        description: "Component code copied to clipboard",
      });
    }
  };

  const categories = {
    form: { name: "Form", icon: User, color: "bg-blue-500" },
    layout: { name: "Layout", icon: Calendar, color: "bg-green-500" },
    navigation: { name: "Navigation", icon: Settings, color: "bg-purple-500" },
    data: { name: "Data", icon: Shield, color: "bg-orange-500" },
    feedback: { name: "Feedback", icon: Bell, color: "bg-cyan-500" }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(categories).map(([key, category]) => {
          const Icon = category.icon;
          const exampleCount = examples.filter(ex => ex.category === key).length;
          return (
            <div
              key={key}
              className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-border/50 rounded-lg hover:bg-card/80 transition-colors cursor-pointer"
            >
              <div className={`w-2 h-2 ${category.color} rounded-full`}></div>
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
              <Badge variant="outline" className="text-xs">
                {exampleCount}
              </Badge>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Example List */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg mb-4">Examples</h3>
          {examples.map((example) => {
            const category = categories[example.category];
            const Icon = category.icon;
            return (
              <Card
                key={example.id}
                className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-card ${
                  selectedExample === example.id 
                    ? 'border-agent-blue/50 bg-agent-blue/5' 
                    : 'border-border/50 hover:border-border'
                }`}
                onClick={() => setSelectedExample(example.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{example.name}</h4>
                    <p className="text-xs text-muted-foreground">{example.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Preview and Code */}
        <div className="lg:col-span-2">
          {selectedExampleData && (
            <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/50">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">{selectedExampleData.name}</h3>
                  <p className="text-muted-foreground">{selectedExampleData.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                  className="flex items-center gap-2"
                >
                  {copiedCode ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </Button>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-6">
                  <div className="min-h-[200px] bg-gradient-to-br from-background via-muted/10 to-background rounded-lg border border-border/50 overflow-hidden">
                    {selectedExampleData.preview}
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-6">
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{selectedExampleData.code}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentPreview;