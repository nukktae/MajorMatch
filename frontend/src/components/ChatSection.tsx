import React, { useState, FC, KeyboardEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { explainChallenge } from '../services/chatopenai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSectionProps {
  challengeTitle: string;
  challengeDescription: string;
}

export const ChatSection: React.FC<ChatSectionProps> = ({ challengeTitle, challengeDescription }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await explainChallenge(`${inputMessage} (Context: ${challengeTitle} - ${challengeDescription})`);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response || 'Sorry, I could not process your request.'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="bg-gradient-to-br from-white to-violet-50 rounded-2xl border border-violet-100 shadow-lg p-6"
    >
      <div className="flex flex-col h-[500px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-violet-100">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-violet-900">Ask AI Assistant</h2>
            <p className="text-sm text-violet-600">Get help with your challenge</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-4 scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-transparent">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center
                              ${message.role === 'user' 
                                ? 'bg-violet-600 text-white' 
                                : 'bg-violet-100 text-violet-600'}`}
                >
                  {message.role === 'user' ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`p-4 rounded-2xl shadow-sm
                              ${message.role === 'user'
                                ? 'bg-violet-600 text-white'
                                : 'bg-white border border-violet-100'}`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Loading Animation */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <div className="bg-white border border-violet-100 p-4 rounded-2xl shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="relative">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask anything about this challenge..."
            className="w-full px-6 py-4 bg-white rounded-xl border border-violet-100 pr-24
                     focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-100
                     placeholder-violet-300 text-violet-800"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="absolute right-2 top-2 px-4 py-2 bg-violet-600 text-white rounded-lg
                     hover:bg-violet-700 active:bg-violet-800 transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-2"
          >
            <span className="font-medium">Send</span>
            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
} 