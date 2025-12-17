import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from './icons';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatBot.css';
import profilePhoto from '../assets/profile_jake.jpg';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');

  // Generate or retrieve session ID
  useEffect(() => {
    let session = localStorage.getItem('chatSessionId');
    if (!session) {
      session = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatSessionId', session);
    }
    setSessionId(session);

    // Load chat history
    loadChatHistory(session);
  }, []);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm Jake's AI assistant. I can answer questions about his experience, skills, and projects. How can I help you today?",
        timestamp: new Date()
      }]);
    }
  }, []);

  const loadChatHistory = async (session) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chat/history/${session}`);
      const data = await response.json();
      
      if (data.success && data.messages.length > 0) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: sessionId
        })
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage = {
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again or use the contact form below.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "What technologies do you work with?",
    "Tell me about your experience",
    "Are you available for work?",
    "How can I contact you?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="chat-bot-button"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
            <span> Chat with Jake</span>
          </motion.button>
          
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`chat-bot-window ${isMinimized ? 'minimized' : ''}`}
          >
            {/* Header */}
            <div className="chat-bot-header">
              <div className="chat-bot-header-info">
                <div className="chat-bot-avatar">
                  <img src={profilePhoto} alt="Jake" className="chat-avatar-img" />
                </div>
                <div className="chat-bot-header-text">
                  <h3>Chat with Jake</h3>
                  <p>Online • Ready to help</p>
                </div>
              </div>
              <div className="chat-bot-header-controls">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="chat-bot-control-btn"
                  aria-label="Minimize"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="chat-bot-control-btn"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="chat-bot-messages">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`chat-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="chat-message-avatar">
                          <img src={profilePhoto} alt="Jake" className="chat-avatar-img" />
                        </div>
                      )}
                      <div className="chat-message-content">
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="chat-message assistant"
                    >
                      <div className="chat-message-avatar">
                        <img src={profilePhoto} alt="Jake" className="chat-avatar-img" />
                      </div>
                      <div className="chat-message-content typing">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Quick Questions */}
                {messages.length <= 1 && (
                  <div className="chat-quick-questions">
                    <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(question)}
                          className="chat-quick-question-btn"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <form onSubmit={sendMessage} className="chat-bot-input-form">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-bot-input"
                    disabled={isTyping}
                    maxLength={500}
                  />
                  <button
                    type="submit"
                    className="chat-bot-send-btn"
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>

                {/* Footer */}
                <div className="chat-bot-footer">
                  <p className="text-xs text-gray-500">
                    Powered by AI • Not all information may be accurate
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
