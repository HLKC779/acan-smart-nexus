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
import { APIKeyManager } from "@/components/APIKeyManager";
import RAGManager from "@/components/RAGManager";
import { 
  ElevenLabsService, 
  ImageAnalysisService, 
  VoiceRecordingService, 
  AIChatService, 
  AudioPlayerService 
} from "@/lib/aiServices";
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
  ArrowLeft,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  aiTask?: string;
  audioUrl?: string;
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
      content: 'Hello! I\'m your AI assistant with advanced RAG capabilities. I can help you with:\n\n🧠 **Smart Chat with RAG** - I can now use your knowledge base to provide contextual responses\n📚 **Knowledge Base Management** - Add documents to enhance my understanding\n🎵 **Text-to-Speech** - Convert text to natural speech\n🎨 **Text-to-Image** - Generate stunning images\n🎬 **Image-to-Video** - Create videos from images\n👁️ **Image Analysis** - Analyze and describe images\n💻 **Code Generation** - Write and debug code\n\nWhat would you like to create or learn about today?',
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
  const [elevenLabsKey, setElevenLabsKey] = useState(() => 
    localStorage.getItem('elevenlabs-api-key') || ''
  );
  const [showSettings, setShowSettings] = useState(false);
  
  // AI Services
  const [elevenLabsService, setElevenLabsService] = useState<ElevenLabsService | null>(null);
  const [imageAnalysisService] = useState(new ImageAnalysisService());
  const [voiceRecordingService] = useState(new VoiceRecordingService());
  const [aiChatService] = useState(new AIChatService());
  const [audioPlayerService] = useState(new AudioPlayerService());
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const aiCapabilities = [
    { id: 'chat', label: 'Smart Chat (RAG)', icon: MessageSquare, color: 'blue' },
    { id: 'rag-manager', label: 'Knowledge Base', icon: Database, color: 'purple' },
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
    "Tell me about AI agent frameworks",
    "What are the key components of memory systems?",
    "Explain cloud-edge architecture",
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

  useEffect(() => {
    // Save API key to localStorage
    localStorage.setItem('elevenlabs-api-key', elevenLabsKey);
    
    // Initialize ElevenLabs service if key is provided
    if (elevenLabsKey.trim()) {
      setElevenLabsService(new ElevenLabsService(elevenLabsKey));
    } else {
      setElevenLabsService(null);
    }
  }, [elevenLabsKey]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() && !selectedFile) return;

    // Validate input based on capability
    if (selectedCapability === 'text-to-speech' && !currentMessage.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter text to convert to speech",
        variant: "destructive",
      });
      return;
    }

    if (selectedCapability === 'image-analysis' && !selectedFile) {
      toast({
        title: "Image Required",
        description: "Please upload an image for analysis",
        variant: "destructive",
      });
      return;
    }

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
    const currentText = currentMessage;
    const currentFile = selectedFile;
    setCurrentMessage('');
    setSelectedFile(null);
    setIsProcessing(true);

    try {
      // Generate AI response
      const aiResponseContent = await aiChatService.generateResponse(
        currentText, 
        selectedCapability, 
        !!currentFile
      );

      let audioUrl: string | undefined;

      // Handle specific AI capabilities with better error handling
      if (selectedCapability === 'text-to-speech') {
        if (!elevenLabsService) {
          toast({
            title: "API Key Required",
            description: "Please configure your ElevenLabs API key in settings",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }

        try {
          toast({
            title: "Generating Speech",
            description: "Converting text to speech...",
          });

          const audioBlob = await elevenLabsService.textToSpeech(currentText);
          audioUrl = URL.createObjectURL(audioBlob);
          
          toast({
            title: "Speech Generated",
            description: "Text has been converted to speech successfully",
          });
          
          if (autoSpeak) {
            await audioPlayerService.playAudio(audioBlob);
          }
        } catch (error) {
          console.error("Text-to-speech error:", error);
          toast({
            title: "Text-to-Speech Error",
            description: error instanceof Error ? error.message : "Please check your ElevenLabs API key",
            variant: "destructive",
          });
        }
      } else if (selectedCapability === 'image-analysis' && currentFile) {
        try {
          toast({
            title: "Analyzing Image",
            description: "Processing image with AI vision models...",
          });

          const analysisResult = await imageAnalysisService.analyzeImage(currentFile);
          
          toast({
            title: "Analysis Complete",
            description: "Image has been analyzed successfully",
          });

          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            type: 'assistant',
            content: analysisResult,
            timestamp: new Date(),
            aiTask: selectedCapability,
            audioUrl
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsProcessing(false);
          return;
        } catch (error) {
          console.error("Image analysis error:", error);
          toast({
            title: "Image Analysis Error",
            description: error instanceof Error ? error.message : "Failed to analyze image",
            variant: "destructive",
          });
        }
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponseContent,
        timestamp: new Date(),
        aiTask: selectedCapability,
        audioUrl
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("AI response error:", error);
      toast({
        title: "AI Error",
        description: error instanceof Error ? error.message : "Failed to generate response",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = async (audioUrl: string) => {
    try {
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();
      await audioPlayerService.playAudio(audioBlob);
    } catch (error) {
      console.error("Audio playback error:", error);
      toast({
        title: "Playback Error",
        description: "Failed to play audio",
        variant: "destructive",
      });
    }
  };

  const toggleRecording = async () => {
    try {
      if (!isRecording) {
        await voiceRecordingService.startRecording();
        setIsRecording(true);
      } else {
        const audioBlob = await voiceRecordingService.stopRecording();
        setIsRecording(false);
        
        // For now, just show success message
        // In a real implementation, you'd convert speech to text here
        toast({
          title: "Recording Complete",
          description: "Voice recording captured successfully",
        });
      }
    } catch (error) {
      console.error("Recording error:", error);
      toast({
        title: "Recording Error",
        description: error instanceof Error ? error.message : "Failed to record audio",
        variant: "destructive",
      });
      setIsRecording(false);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a valid image file (JPG, PNG, WebP, or GIF)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
      toast({
        title: "Image Selected",
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB) is ready for analysis`,
      });
    }
    
    // Reset the input value to allow selecting the same file again
    event.target.value = '';
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    toast({
      title: "File Removed",
      description: "Image has been removed",
    });
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
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
          <div className="lg:col-span-1 space-y-6">
            {/* API Configuration */}
            {showSettings && (
              <APIKeyManager
                elevenLabsKey={elevenLabsKey}
                onElevenLabsKeyChange={setElevenLabsKey}
              />
            )}
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
            {selectedCapability === 'rag-manager' ? (
              <Card className="h-[calc(100vh-200px)]">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        Knowledge Base Manager
                        <Badge variant="secondary" className="bg-purple/10 text-purple">
                          RAG System
                        </Badge>
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 h-[calc(100vh-280px)] overflow-y-auto">
                  <RAGManager />
                </CardContent>
              </Card>
            ) : (
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
                        
                        {/* Audio Player for TTS */}
                        {message.audioUrl && (
                          <div className="mt-3 p-2 bg-background/50 rounded border">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => playAudio(message.audioUrl!)}
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Play Audio
                              </Button>
                              <span className="text-xs text-muted-foreground">
                                AI-generated speech
                              </span>
                            </div>
                          </div>
                        )}
                        
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
                      onClick={removeSelectedFile}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      Remove
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
            )}
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default AIChat;