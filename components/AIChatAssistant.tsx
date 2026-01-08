import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm your AI assistant powered by Microsoft Azure OpenAI. I can help you with fundraising questions, investor matching, pitch deck tips, and more. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated AI responses - In production, this would call Azure OpenAI API
  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerMessage = userMessage.toLowerCase();

    // Smart pattern matching for common questions
    if (lowerMessage.includes('investor') || lowerMessage.includes('fund')) {
      return "🎯 I can help you find the right investors! FundSpark AI analyzes 10,000+ investor profiles to match you with VCs aligned with your industry, stage, and funding needs. Would you like to explore our Investor Connect feature?";
    } else if (lowerMessage.includes('pitch') || lowerMessage.includes('deck')) {
      return "📊 Our AI-powered Pitch Deck Analyzer can review your deck in under 60 seconds! It evaluates problem clarity, solution strength, market opportunity, team credibility, and financial projections. Upload your deck in the Pitch Review section to get started!";
    } else if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "💰 We offer flexible pricing:\n\n🚀 Starter: FREE - Perfect for getting started\n📈 Growth: $99/month - Advanced AI analytics & unlimited investor matches\n🏢 Enterprise: Custom pricing - White-label solutions\n\nStart with our free plan and upgrade anytime!";
    } else if (lowerMessage.includes('content') || lowerMessage.includes('social') || lowerMessage.includes('customer')) {
      return "📱 Our Content Intelligence tool monitors social media sentiment, analyzes customer insights, and optimizes your content strategy. It helps you understand what your audience cares about and predicts engagement to maximize customer acquisition!";
    } else if (lowerMessage.includes('analytics') || lowerMessage.includes('data') || lowerMessage.includes('metrics')) {
      return "📊 Business Analytics gives you real-time insights:\n• Track growth metrics & KPIs\n• Competitive intelligence\n• Market opportunity identification\n• AI-powered predictions\n• Export investor-ready reports\n\nAll in one intuitive dashboard!";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('start') || lowerMessage.includes('how')) {
      return "🚀 Getting started is easy!\n\n1️⃣ Sign up for free\n2️⃣ Connect your data sources\n3️⃣ Let AI analyze your market\n4️⃣ Get instant investor matches & insights\n\nYou can start with investor matching, pitch deck analysis, or content optimization. What interests you most?";
    } else if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "👋 Hello! Great to meet you! I'm here to help you navigate FundSpark AI and accelerate your startup growth. What would you like to know about?";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! 😊 Feel free to ask me anything about fundraising, investors, pitch decks, or our features. I'm here to help!";
    } else {
      return `I understand you're asking about "${userMessage}". FundSpark AI offers three core features:\n\n1️⃣ Investor Connect - AI matching with 10K+ investors\n2️⃣ Content Intelligence - Social sentiment & customer insights\n3️⃣ Business Analytics - Real-time growth metrics\n\nWhich area interests you? Or ask me anything specific about fundraising!`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Get AI response
    try {
      const aiResponse = await getAIResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again or contact support at hello@fundspark.ai",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick action buttons
  const quickActions = [
    { label: "Find Investors", query: "How do I find investors?" },
    { label: "Review My Pitch", query: "Can you review my pitch deck?" },
    { label: "Pricing Plans", query: "What are your pricing plans?" },
    { label: "Get Started", query: "How do I get started?" }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
        } text-white rounded-full p-4 shadow-2xl flex items-center justify-center group`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6" />
              <motion.span
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-24 right-6 z-50 w-96 h-[600px] ${
              isDarkMode ? 'bg-slate-800' : 'bg-white'
            } rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <Sparkles className="w-3 h-3" />
                    <span>Microsoft Azure OpenAI</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] bg-white/20 px-2 py-1 rounded">
                MS AI
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
              isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
            }`}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[70%] rounded-2xl p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : isDarkMode ? 'bg-slate-700 text-slate-100' : 'bg-white text-slate-800 shadow'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className={`rounded-2xl p-3 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-white shadow'
                  }`}>
                    <div className="flex gap-1">
                      <motion.span
                        className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-slate-400' : 'bg-slate-600'}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      />
                      <motion.span
                        className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-slate-400' : 'bg-slate-600'}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      />
                      <motion.span
                        className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-slate-400' : 'bg-slate-600'}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className={`p-3 space-y-2 border-t ${
                isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'
              }`}>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
                  Quick actions:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setInputMessage(action.query);
                      }}
                      className={`text-xs p-2 rounded-lg ${
                        isDarkMode 
                          ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' 
                          : 'bg-white hover:bg-slate-100 text-slate-700'
                      } border ${isDarkMode ? 'border-slate-600' : 'border-slate-200'} transition-colors`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className={`p-4 border-t ${
              isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className={`flex-1 px-4 py-2 rounded-full ${
                    isDarkMode 
                      ? 'bg-slate-700 text-white placeholder-slate-400' 
                      : 'bg-slate-100 text-slate-900 placeholder-slate-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={`p-2 rounded-full ${
                    inputMessage.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : isDarkMode ? 'bg-slate-700 text-slate-500' : 'bg-slate-200 text-slate-400'
                  } transition-colors`}
                  whileHover={inputMessage.trim() ? { scale: 1.05 } : {}}
                  whileTap={inputMessage.trim() ? { scale: 0.95 } : {}}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
