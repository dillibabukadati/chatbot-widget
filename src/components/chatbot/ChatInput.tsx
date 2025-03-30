import React from 'react';

interface ChatInputProps {
  input: string;
  isStreaming: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  isStreaming,
  onInputChange,
  onSend,
}) => {
  return (
    <div className="chat-input-container">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="Type your message..."
          className="chat-input"
          disabled={isStreaming}
        />
        <button
          onClick={onSend}
          disabled={isStreaming || !input.trim()}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};