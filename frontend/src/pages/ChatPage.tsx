import { useState, useEffect, useRef } from 'react';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import { sendMessage, getMessageHistory } from '../services/chatService';

interface Message {
  id: string;
  content: string;
  message_type: string;
  sender_type: 'user' | 'ai';
  agent_name?: string;
  agent_type?: string;
  timestamp: string;
  metadata?: any;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingAgent, setTypingAgent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessageHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessageHistory = async () => {
    try {
      const response = await getMessageHistory();
      if (response.success) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error('Failed to load message history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message immediately
    const userMessage: Message = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: content.trim(),
      message_type: 'text',
      sender_type: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Send message to backend
      const response = await sendMessage(content.trim());

      if (response.success) {
        // Add AI response
        const aiMessage: Message = {
          id: response.data.id,
          content: response.data.content,
          message_type: response.data.message_type,
          sender_type: 'ai',
          agent_name: response.data.agent_name,
          agent_type: response.data.agent_type,
          timestamp: response.data.timestamp,
          metadata: response.data.metadata,
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);

      // Add error message
      const errorMessage: Message = {
        id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        content: 'Sorry, I encountered an error processing your message. Please try again.',
        message_type: 'text',
        sender_type: 'ai',
        agent_name: 'System',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      setTypingAgent(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AI Co-Founder</h1>
            <p className="text-sm text-gray-500">
              {isTyping ? `${typingAgent} is typing...` : 'Ask me anything about your business'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="btn btn-secondary text-sm">
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🤖</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Welcome to your AI Co-Founder!
            </h2>
            <p className="text-gray-600 mb-4">
              I'm here to help you manage your business operations. Try asking me to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto">
              <button
                onClick={() => handleSendMessage('Send payment link of $299 to Sam')}
                className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
              >
                💰 Send payment link of $299 to Sam
              </button>
              <button
                onClick={() => handleSendMessage('Find 20 leads in e-commerce industry')}
                className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
              >
                🎯 Find 20 leads in e-commerce industry
              </button>
              <button
                onClick={() => handleSendMessage('Onboard new client TechStart Inc, $5,000/month retainer')}
                className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
              >
                👥 Onboard new client TechStart Inc
              </button>
              <button
                onClick={() => handleSendMessage('Summarize my important emails')}
                className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
              >
                📧 Summarize my important emails
              </button>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}

        {isTyping && (
          <div className="flex items-center space-x-2">
            <div className="agent-avatar bg-gray-400">
              AI
            </div>
            <div className="message-bubble ai">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}