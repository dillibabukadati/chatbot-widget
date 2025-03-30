import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`message-wrapper ${message.isBot ? 'bot' : 'user'}`}>
      <div className={`message ${message.isBot ? 'bot-message' : 'user-message'}`}>
        <ReactMarkdown
          components={{
            code: ({ className, children }) => {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              const isBlock = className?.includes('language-');

              return isBlock ? (
                <SyntaxHighlighter
                  language={language}
                  PreTag="div"
                  style={{
                    ...vscDarkPlus,
                    'pre[class*="language-"]': {
                      background: '#1E1E1E',
                      padding: '1em',
                      borderRadius: '0.5em',
                      overflow: 'auto',
                    },
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-800 text-gray-200 px-1 py-0.5 rounded text-sm">
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};