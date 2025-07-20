import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Key, ExternalLink, Check, X } from "lucide-react";

interface APIKeyManagerProps {
  elevenLabsKey: string;
  onElevenLabsKeyChange: (key: string) => void;
  onValidate?: () => void;
}

export const APIKeyManager = ({ 
  elevenLabsKey, 
  onElevenLabsKeyChange,
  onValidate 
}: APIKeyManagerProps) => {
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [keyStatus, setKeyStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const validateKey = async () => {
    if (!elevenLabsKey.trim()) return;
    
    setIsValidating(true);
    try {
      // Test the ElevenLabs API key with a simple request
      const response = await fetch("https://api.elevenlabs.io/v1/voices", {
        headers: {
          "xi-api-key": elevenLabsKey,
        },
      });
      
      if (response.ok) {
        setKeyStatus('valid');
        onValidate?.();
      } else {
        setKeyStatus('invalid');
      }
    } catch (error) {
      setKeyStatus('invalid');
    } finally {
      setIsValidating(false);
    }
  };

  const getStatusBadge = () => {
    switch (keyStatus) {
      case 'valid':
        return <Badge variant="default" className="bg-green-100 text-green-800"><Check className="w-3 h-3 mr-1" />Valid</Badge>;
      case 'invalid':
        return <Badge variant="destructive"><X className="w-3 h-3 mr-1" />Invalid</Badge>;
      default:
        return <Badge variant="secondary">Not tested</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          API Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            Configure your API keys to enable advanced AI features. Your keys are stored locally and never sent to our servers.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="elevenlabs-key">ElevenLabs API Key</Label>
            {getStatusBadge()}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="elevenlabs-key"
                type={showKey ? "text" : "password"}
                value={elevenLabsKey}
                onChange={(e) => {
                  onElevenLabsKeyChange(e.target.value);
                  setKeyStatus('idle');
                }}
                placeholder="sk-..."
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <Button 
              variant="outline" 
              onClick={validateKey}
              disabled={!elevenLabsKey.trim() || isValidating}
            >
              {isValidating ? "Testing..." : "Test"}
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Get your API key from</span>
            <a 
              href="https://elevenlabs.io/app/speech-synthesis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              ElevenLabs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Available Features:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${elevenLabsKey ? 'bg-green-500' : 'bg-gray-300'}`} />
              Text-to-Speech
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Image Analysis
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Voice Recording
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Smart Chat
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};