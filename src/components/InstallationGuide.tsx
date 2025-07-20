import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy, 
  CheckCircle, 
  Package, 
  Terminal, 
  Download,
  Code,
  Zap,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InstallationStep {
  id: string;
  title: string;
  description: string;
  command?: string;
  code?: string;
  note?: string;
}

interface PackageManager {
  name: string;
  command: string;
  icon: React.ReactNode;
}

const InstallationGuide = () => {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [selectedPackageManager, setSelectedPackageManager] = useState("npm");
  const { toast } = useToast();

  const packageManagers: PackageManager[] = [
    { name: "npm", command: "npm install", icon: <Package className="w-4 h-4" /> },
    { name: "yarn", command: "yarn add", icon: <Package className="w-4 h-4" /> },
    { name: "pnpm", command: "pnpm add", icon: <Package className="w-4 h-4" /> },
    { name: "bun", command: "bun add", icon: <Zap className="w-4 h-4" /> }
  ];

  const dependencies = [
    "@radix-ui/react-dialog",
    "@radix-ui/react-tabs", 
    "@radix-ui/react-toast",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "lucide-react"
  ];

  const installationSteps: InstallationStep[] = [
    {
      id: "install-deps",
      title: "Install Dependencies",
      description: "Install the required packages for the component library",
      command: `${packageManagers.find(pm => pm.name === selectedPackageManager)?.command} ${dependencies.join(" ")}`,
      note: "These are the core dependencies needed for all components to work properly."
    },
    {
      id: "setup-tailwind",
      title: "Configure Tailwind CSS",
      description: "Add the component library styles to your tailwind.config.js",
      code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... other colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`,
      note: "Make sure to include all the CSS variables in your globals.css file."
    },
    {
      id: "setup-css",
      title: "Add CSS Variables",
      description: "Add the required CSS variables to your globals.css",
      code: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode variables */
  }
}`,
      note: "These CSS variables enable theming and dark mode support."
    },
    {
      id: "create-utils",
      title: "Create Utility Functions",
      description: "Set up the utility functions for class merging",
      code: `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
      note: "Create this file at src/lib/utils.ts - it's used throughout the component library."
    },
    {
      id: "copy-components",
      title: "Add Components",
      description: "Copy the component files to your project",
      command: "mkdir -p src/components/ui && cp -r components/* src/components/ui/",
      note: "Download the components from our repository or copy them manually."
    },
    {
      id: "import-components",
      title: "Import and Use",
      description: "Start using the components in your application",
      code: `import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MyComponent() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Welcome!</h3>
      <p className="text-muted-foreground mb-4">
        You're now ready to use the component library.
      </p>
      <div className="flex gap-2">
        <Button>Get Started</Button>
        <Badge>New</Badge>
      </div>
    </Card>
  )
}`,
      note: "Make sure your TypeScript paths are configured to resolve @/ to your src directory."
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    setTimeout(() => setCopiedCommand(null), 2000);
    toast({
      title: "Copied to clipboard",
      description: "The command has been copied to your clipboard",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Installation Guide</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get started with our component library in just a few steps. 
          Choose your preferred package manager and follow the guide.
        </p>
      </div>

      {/* Package Manager Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Choose Your Package Manager
        </h3>
        <div className="flex flex-wrap gap-3">
          {packageManagers.map((pm) => (
            <Button
              key={pm.name}
              variant={selectedPackageManager === pm.name ? "default" : "outline"}
              onClick={() => setSelectedPackageManager(pm.name)}
              className={`flex items-center gap-2 ${
                selectedPackageManager === pm.name 
                  ? "bg-gradient-primary shadow-glow" 
                  : "hover:bg-accent/50"
              }`}
            >
              {pm.icon}
              {pm.name}
            </Button>
          ))}
        </div>
      </Card>

      {/* Quick Start */}
      <Card className="p-6 bg-gradient-to-br from-agent-blue/10 via-transparent to-agent-cyan/10 border-agent-blue/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-background" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Start</h3>
            <p className="text-sm text-muted-foreground">Get up and running in under 2 minutes</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
            <code className="text-sm font-mono">
              {packageManagers.find(pm => pm.name === selectedPackageManager)?.command} ai-agent-components
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(
                `${packageManagers.find(pm => pm.name === selectedPackageManager)?.command} ai-agent-components`,
                "quick-install"
              )}
            >
              {copiedCommand === "quick-install" ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="w-4 h-4" />
            <span>Or follow the detailed manual installation below</span>
          </div>
        </div>
      </Card>

      {/* Installation Steps */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Manual Installation</h3>
        
        {installationSteps.map((step, index) => (
          <Card key={step.id} className="p-6 hover:shadow-card transition-all duration-300">
            <div className="flex items-start gap-4">
              {/* Step Number */}
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-background font-semibold text-sm flex-shrink-0">
                {index + 1}
              </div>
              
              {/* Step Content */}
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                
                {/* Command */}
                {step.command && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                      <code className="text-sm font-mono text-foreground">{step.command}</code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(step.command!, step.id)}
                      >
                        {copiedCommand === step.id ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Code */}
                {step.code && (
                  <div className="mb-4">
                    <div className="relative">
                      <pre className="text-sm bg-muted/30 rounded-lg p-4 border border-border/50 overflow-x-auto">
                        <code>{step.code}</code>
                      </pre>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(step.code!, step.id)}
                      >
                        {copiedCommand === step.id ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Note */}
                {step.note && (
                  <div className="p-3 bg-agent-blue/5 border border-agent-blue/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Code className="w-4 h-4 text-agent-blue mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground/80">{step.note}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-to-br from-agent-green/10 via-transparent to-agent-cyan/10 border-agent-green/20">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          You're All Set!
        </h3>
        <p className="text-muted-foreground mb-4">
          Congratulations! You've successfully installed the AI Agent Components library. 
          Here are some next steps to get you started:
        </p>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-gradient-primary hover:shadow-glow">
            <Code className="w-4 h-4 mr-2" />
            View Examples
          </Button>
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Read Documentation
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Templates
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InstallationGuide;
