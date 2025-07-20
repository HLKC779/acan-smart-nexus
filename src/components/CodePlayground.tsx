import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Play, 
  Copy, 
  Download, 
  RefreshCw, 
  Code, 
  Eye,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodePlaygroundProps {
  title: string;
  initialCode: string;
  language: string;
  componentType: 'react' | 'typescript' | 'javascript' | 'css';
  dependencies?: string[];
}

const CodePlayground = ({ 
  title, 
  initialCode, 
  language, 
  componentType, 
  dependencies = [] 
}: CodePlaygroundProps) => {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const runCode = async () => {
    setIsRunning(true);
    setErrors([]);
    
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOutput(`// Output for ${title}\n// Code executed successfully!\n// Component rendered without errors.`);
      
      toast({
        title: "Code Executed",
        description: "Your code has been compiled and executed successfully!",
      });
    } catch (error) {
      setErrors(["Compilation error: Invalid syntax detected"]);
      toast({
        title: "Execution Failed",
        description: "Please check your code for errors.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: "Code has been copied to clipboard",
    });
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput("");
    setErrors([]);
    toast({
      title: "Code Reset",
      description: "Code has been reset to the original example",
    });
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: `${title} code file has been downloaded`,
    });
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-background" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {language}
              </Badge>
              <Badge variant="outline" className="text-xs bg-agent-blue/10 text-agent-blue">
                {componentType}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyCode}
            className="hover:bg-agent-blue/10"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetCode}
            className="hover:bg-agent-orange/10"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadCode}
            className="hover:bg-agent-green/10"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            onClick={runCode}
            disabled={isRunning}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            size="sm"
          >
            {isRunning ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>

      {/* Dependencies */}
      {dependencies.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Dependencies:</h4>
          <div className="flex flex-wrap gap-2">
            {dependencies.map((dep, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-muted/50">
                {dep}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Code Editor */}
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="output" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Output
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="mt-4">
          <div className="relative">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[400px] font-mono text-sm bg-muted/30 border-border/50 focus:border-agent-blue/50"
              placeholder="Write your code here..."
            />
            {/* Line numbers simulation */}
            <div className="absolute left-2 top-2 flex flex-col text-xs text-muted-foreground/50 pointer-events-none">
              {code.split('\n').map((_, index) => (
                <span key={index} className="h-5 leading-5">
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <Card className="p-6 min-h-[400px] bg-gradient-to-br from-background via-muted/10 to-background border-border/50">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
                  <Eye className="w-8 h-8 text-background" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Component Preview</h4>
                <p className="text-muted-foreground mb-4">
                  Your component will render here
                </p>
                <Button
                  onClick={runCode}
                  disabled={isRunning}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  {isRunning ? "Rendering..." : "Render Component"}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="output" className="mt-4">
          <Card className="p-6 min-h-[400px] bg-muted/20 border-border/50">
            {/* Errors */}
            {errors.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Errors</span>
                </div>
                {errors.map((error, index) => (
                  <div key={index} className="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
                    {error}
                  </div>
                ))}
              </div>
            )}

            {/* Success Output */}
            {output && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-500">Success</span>
                </div>
                <pre className="text-sm text-foreground bg-background/50 p-4 rounded border border-border/50 overflow-x-auto">
                  {output}
                </pre>
              </div>
            )}

            {/* Default State */}
            {!output && errors.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Play className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Run your code to see the output</p>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CodePlayground;