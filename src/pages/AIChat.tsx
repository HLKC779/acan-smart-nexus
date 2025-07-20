import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Send,
  Mic,
  MicOff,
  Image,
  Video,
  Eye,
  Brain,
  Sparkles,
  Upload,
  Download,
  Play,
  Pause,
  Settings,
  MessageSquare,
  Zap,
  Camera,
  FileText,
  Music,
  Code,
  Globe,
  Search,
  Lightbulb,
  Cpu,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  aiTask?: string;
}

interface Attachment {
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  name: string;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant with advanced capabilities. I can help you with text-to-speech, image generation, video creation, image analysis, and much more. What would you like to create today?',
      timestamp: new Date(),
      aiTask: 'greeting'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState('chat');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const aiCapabilities = [
    { id: 'chat', label: 'Smart Chat', icon: MessageSquare, color: 'blue' },
    { id: 'text-to-speech', label: 'Text-to-Speech', icon: Mic, color: 'green' },
    { id: 'text-to-image', label: 'Text-to-Image', icon: Image, color: 'purple' },
    { id: 'image-to-video', label: 'Image-to-Video', icon: Video, color: 'red' },
    { id: 'image-analysis', label: 'Image Analysis', icon: Eye, color: 'orange' },
    { id: 'code-generation', label: 'Code Generation', icon: Code, color: 'cyan' },
    { id: 'content-writing', label: 'Content Writing', icon: FileText, color: 'indigo' },
    { id: 'research', label: 'Research & Search', icon: Search, color: 'pink' },
    { id: 'brainstorming', label: 'Brainstorming', icon: Lightbulb, color: 'yellow' },
    { id: 'automation', label: 'Task Automation', icon: Zap, color: 'emerald' }
  ];

  const quickPrompts = [
    "Generate an image of a futuristic city",
    "Convert this text to speech",
    "Analyze this image for me", 
    "Create a video from this image",
    "Write a Python script for data analysis",
    "Research the latest AI trends",
    "Help me brainstorm app ideas",
    "Create content for social media"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() && !selectedFile) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
      attachments: selectedFile ? [{
        type: selectedFile.type.startsWith('image/') ? 'image' : 
              selectedFile.type.startsWith('video/') ? 'video' :
              selectedFile.type.startsWith('audio/') ? 'audio' : 'document',
        url: URL.createObjectURL(selectedFile),
        name: selectedFile.name
      }] : undefined,
      aiTask: selectedCapability
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    setSelectedFile(null);
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(newMessage),
        timestamp: new Date(),
        aiTask: selectedCapability
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);

      if (autoSpeak && selectedCapability === 'text-to-speech') {
        simulateTextToSpeech(aiResponse.content);
      }
    }, 2000);
  };

  const generateAIResponse = (userMessage: Message): string => {
    const capability = userMessage.aiTask;
    const hasAttachment = userMessage.attachments && userMessage.attachments.length > 0;

    switch (capability) {
      case 'text-to-speech':
        return `🎵 Converting your text to speech: "${userMessage.content}"\n\nAudio has been generated with natural voice synthesis. You can play it using the controls below.`;
      
      case 'text-to-image':
        return `🎨 Generated image based on: "${userMessage.content}"\n\nI've created a high-quality image using advanced diffusion models. The image captures the essence of your prompt with artistic flair.`;
      
      case 'image-to-video':
        return hasAttachment 
          ? `🎬 Converting your image to video...\n\nI'm creating a dynamic video sequence from your image using motion synthesis. The video will include smooth transitions and realistic movement.`
          : `Please upload an image first to convert it to video.`;
      
      case 'image-analysis':
        return hasAttachment
          ? `👁️ Analyzing your image...\n\nI can see: Objects, people, text, colors, composition, and context. The image shows excellent lighting and contains several interesting elements that I can describe in detail.`
          : `Please upload an image for me to analyze.`;
      
      case 'code-generation':
        return `💻 Generated code for: "${userMessage.content}"\n\n\`\`\`python\n# AI-generated code\ndef solve_problem():\n    # Implementation based on your requirements\n    return "Solution implemented"\n\`\`\`\n\nThe code follows best practices and includes error handling.`;
      
      case 'research':
        return `🔍 Research results for: "${userMessage.content}"\n\nI've gathered comprehensive information from multiple sources. Here are the key findings, trends, and insights relevant to your query.`;
      
      case 'brainstorming':
        return `💡 Brainstorming ideas for: "${userMessage.content}"\n\n1. Creative approach with innovative features\n2. User-centered design thinking\n3. Technology integration opportunities\n4. Market differentiation strategies\n5. Implementation roadmap`;
      
      default:
        return `I understand you're asking about "${userMessage.content}". I can help you with this using my advanced AI capabilities. Would you like me to process this with a specific AI function?`;
    }
  };

  const simulateTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording Started",
        description: "Speak now to input your message",
      });
    } else {
      toast({
        title: "Recording Stopped",
        description: "Processing your voice input...",
      });
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} is ready to be processed`,
      });
    }
  };

  const getCapabilityColor = (capability: string) => {
    const cap = aiCapabilities.find(c => c.id === capability);
    return cap?.color || 'blue';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">AI Intelligence Hub</h1>
                  <p className="text-sm text-muted-foreground">Advanced AI capabilities at your fingertips</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="auto-speak" className="text-sm">Auto-speak</Label>
                <Switch
                  id="auto-speak"
                  checked={autoSpeak}
                  onCheckedChange={setAutoSpeak}
                />
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Capabilities Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {aiCapabilities.map((capability) => (
                  <Button
                    key={capability.id}
                    variant={selectedCapability === capability.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCapability(capability.id)}
                  >
                    <capability.icon className="w-4 h-4 mr-2" />
                    {capability.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Prompts */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Quick Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left h-auto p-2 text-wrap"
                    onClick={() => setCurrentMessage(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)]">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Chat Interface
                      <Badge variant="secondary" className={`bg-${getCapabilityColor(selectedCapability)}/10 text-${getCapabilityColor(selectedCapability)}`}>
                        {aiCapabilities.find(c => c.id === selectedCapability)?.label}
                      </Badge>
                    </CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleFileUpload}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4 h-[calc(100vh-350px)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.attachments && (
                          <div className="mb-2 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <Camera className="w-4 h-4" />
                                {attachment.name}
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                          {message.aiTask && (
                            <Badge variant="outline" className="text-xs">
                              {aiCapabilities.find(c => c.id === message.aiTask)?.label}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-4 bg-muted">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                          <span>AI is processing your request...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t p-4">
                {selectedFile && (
                  <div className="mb-3 p-2 bg-muted rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm">{selectedFile.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      ×
                    </Button>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder={`Type your ${selectedCapability} request here...`}
                      className="min-h-[40px] max-h-[120px]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleRecording}
                      className={isRecording ? 'bg-red-100 text-red-600' : ''}
                    >
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    
                    <Button onClick={handleSendMessage} disabled={!currentMessage.trim() && !selectedFile}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default AIChat;