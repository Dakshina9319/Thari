import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  MessageCircle,
  Send,
  X,
  Minimize2,
  Maximize2,
  Bot,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'loomy';
  timestamp: Date;
}

const predefinedResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'greeting'],
    response: "Hello! I'm Loomy, your Tharikai assistant. I'm here to help you with anything related to saree weaving, orders, schemes, or navigating the platform. How can I assist you today?"
  },
  {
    keywords: ['help', 'support', 'assist'],
    response: "I'm here to help! I can assist you with:\n• Finding products and weavers\n• Understanding government schemes\n• Tracking orders and production\n• Navigating the Tharikai platform\n• General questions about handloom weaving\n\nWhat would you like to know more about?"
  },
  {
    keywords: ['order', 'track', 'status', 'delivery'],
    response: "I can help you track your orders! You can find detailed order tracking in the 'My Orders' section. Each order shows real-time production progress, estimated delivery dates, and allows direct communication with weavers."
  },
  {
    keywords: ['scheme', 'government', 'benefit', 'apply'],
    response: "Government schemes are available for weavers! You can browse eligible schemes in the 'Government Schemes' section. Popular schemes include:\n• Handloom Weaver Welfare Scheme (₹5L coverage)\n• National Handloom Development Programme\n• Weaver Credit Card Scheme\n\nWould you like help with a specific scheme?"
  },
  {
    keywords: ['weaver', 'artisan', 'craft'],
    response: "Our platform connects you with master weavers across India! You can explore weaver profiles in the 'Featured Weavers' section to see their specialties, ratings, and portfolio. Each weaver is verified and has detailed information about their craft and experience."
  },
  {
    keywords: ['price', 'cost', 'payment'],
    response: "Saree prices vary based on type, material, and craftsmanship:\n• Cotton sarees: ₹3,000 - ₹15,000\n• Silk sarees: ₹15,000 - ₹75,000+\n• Premium handloom: ₹25,000 - ₹1,00,000+\n\nAll payments are secure and weavers receive fair compensation for their work."
  },
  {
    keywords: ['tharikai', 'platform', 'about'],
    response: "Tharikai is a platform dedicated to preserving and promoting traditional handloom weaving. We connect skilled weavers with customers while ensuring fair trade, quality craftsmanship, and cultural heritage preservation. Our mission is 'Weaving Tradition, Building Future'."
  }
];

const LoomyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Loomy, your friendly Tharikai voice assistant. I'm here to help you with anything you need - from finding the perfect saree to understanding our platform. You can type or speak to me. How can I help you today?",
      sender: 'loomy',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  // Voice assistant states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Refs for speech APIs
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech APIs
  useEffect(() => {
    // Check for speech synthesis support
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setSpeechSupported(true);
    }

    // Check for speech recognition support
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);

        // Auto-send voice message
        setTimeout(() => {
          handleSendMessage(transcript);
        }, 100);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      setSpeechSupported(true);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Speech synthesis function
  const speakText = (text: string) => {
    if (!synthRef.current || !isVoiceEnabled) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    // Try to use a female voice if available
    const voices = synthRef.current.getVoices();
    const femaleVoice = voices.find(voice =>
      voice.name.toLowerCase().includes('female') ||
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('karen') ||
      voice.name.toLowerCase().includes('zira')
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    synthRef.current.speak(utterance);
  };

  // Start voice recognition
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  // Stop voice recognition
  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  // Toggle speech output
  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (isSpeaking && synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const response of predefinedResponses) {
      if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response.response;
      }
    }
    
    // Default response
    return "Thank you for your message! I'm still learning about that topic. For detailed assistance, you can:\n• Browse our FAQ section\n• Contact our support team\n• Explore the relevant sections of the platform\n\nIs there something specific about Tharikai or handloom sarees I can help you with?";
  };

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate Loomy's response
    setTimeout(() => {
      const responseContent = generateResponse(textToSend);
      const loomyResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'loomy',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, loomyResponse]);

      // Speak the response if voice is enabled
      if (isVoiceEnabled) {
        setTimeout(() => speakText(responseContent), 500);
      }
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
            isListening
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : isSpeaking
                ? "bg-green-500 hover:bg-green-600 animate-pulse"
                : "bg-primary hover:bg-primary/90"
          )}
        >
          {isListening ? (
            <Radio className="h-6 w-6 animate-spin" />
          ) : isSpeaking ? (
            <Volume2 className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>

        {/* Voice activity indicator */}
        {(isListening || isSpeaking) && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              isListening ? "bg-red-500" : "bg-green-500"
            )} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(
      "fixed z-50 transition-all duration-300",
      isMinimized 
        ? "bottom-6 right-6 w-80 h-16"
        : "bottom-6 right-6 w-96 h-[500px]"
    )}>
      <Card className="w-full h-full shadow-2xl border-2 border-primary/20">
        <CardHeader className="p-4 bg-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 border-2 border-white/20">
                <AvatarImage src="/placeholder.svg" alt="Loomy" />
                <AvatarFallback className="bg-white/20 text-white text-sm">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-medium flex items-center">
                  Loomy
                  {isListening && (
                    <Radio className="h-3 w-3 ml-2 animate-spin text-red-300" />
                  )}
                  {isSpeaking && (
                    <Volume2 className="h-3 w-3 ml-2 animate-pulse text-green-300" />
                  )}
                </CardTitle>
                {!isMinimized && (
                  <p className="text-xs text-white/80">
                    Voice Assistant • {speechSupported ? 'Voice Ready' : 'Text Only'}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {speechSupported && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleVoice}
                  className="h-6 w-6 p-0 text-white hover:bg-white/20"
                  title={isVoiceEnabled ? "Disable voice" : "Enable voice"}
                >
                  {isVoiceEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                          message.sender === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground'
                        )}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p
                          className={cn(
                            "text-xs mt-1",
                            message.sender === 'user'
                              ? 'text-white/70'
                              : 'text-muted-foreground'
                          )}
                        >
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={speechSupported ? "Type or speak your message..." : "Type your message..."}
                  className="flex-1"
                />
                {speechSupported && (
                  <Button
                    onClick={isListening ? stopListening : startListening}
                    size="sm"
                    variant={isListening ? "destructive" : "outline"}
                    className={cn(
                      "transition-all duration-300",
                      isListening && "animate-pulse"
                    )}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                )}
                <Button onClick={() => handleSendMessage()} size="sm" disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {speechSupported && (
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>
                    {isListening
                      ? "🎤 Listening..."
                      : isSpeaking
                        ? "🔊 Speaking..."
                        : "💬 Voice & text ready"
                    }
                  </span>
                  <span className="text-xs">
                    Voice: {isVoiceEnabled ? "ON" : "OFF"}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default LoomyChatbot;
