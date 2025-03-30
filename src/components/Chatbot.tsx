import React, { useState, useRef, useEffect } from 'react';
import { ChatbotProps, Message } from './chatbot/types';
import { ChatToggleButton } from './chatbot/ChatToggleButton';
import { ChatHeader } from './chatbot/ChatHeader';
import { ChatMessages } from './chatbot/ChatMessages';
import { ChatInput } from './chatbot/ChatInput';

const Chatbot: React.FC<ChatbotProps> = ({
  apiHost = 'http://localhost:3000',
  chatflowid = 'default',
  theme = {},
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date(),
    };

    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "Thinking...",
      isBot: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, thinkingMessage]);
    setInput('');
    setIsStreaming(true);

    try {
      const response = await fetch(`${apiHost}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: data.message || "I'm sorry, I couldn't process that.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev.slice(0, -1), botMessage]); // Replace "Thinking..." message with the actual response
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev.slice(0, -1), // Remove "Thinking..."
        {
          id: (Date.now() + 2).toString(),
          content: "I'm sorry, but something went wrong. Please try again later!",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };


  return (
    <div className="fixed bottom-4 right-4 z-50">
      <ChatToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {isOpen && (
        <div
          className="chat-container absolute bottom-16 right-0 shadow-xl overflow-hidden"
          style={{
            height: theme.chatWindow?.height || '600px',
            width: theme.chatWindow?.width || '400px',
          }}
        >
          <ChatHeader onClose={() => setIsOpen(false)} />
          <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />
          <ChatInput
            input={input}
            isStreaming={isStreaming}
            onInputChange={setInput}
            onSend={handleSend}
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
