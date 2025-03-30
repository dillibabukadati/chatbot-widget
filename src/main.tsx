import React from 'react';
import ReactDOM from 'react-dom/client';
import Chatbot from './components/Chatbot';
import styles from './index.css?inline';
import { injectStyles, removeStyles } from './injectStyles';

// Create a global type for the widget configuration
declare global {
  interface Window {
    ChatbotWidget: {
      init: (config: {
        apiHost?: string;
        chatflowid?: string;
        theme?: {
          chatWindow?: {
            height?: number;
            width?: number;
          };
        };
      }) => void;
      destroy?: () => void;
    };
  }
}

// Initialize the widget
window.ChatbotWidget = {
  init: (config) => {
    // Remove any existing chatbot container and styles
    const existingContainer = document.getElementById('chatbot-widget-root');
    if (existingContainer) {
      existingContainer.remove();
    }
    removeStyles();

    // Inject styles
    injectStyles(styles);

    // Create new container
    const container = document.createElement('div');
    container.id = 'chatbot-widget-root';
    document.body.appendChild(container);

    // Render the chatbot
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <Chatbot {...config} />
      </React.StrictMode>
    );
  },
  destroy: () => {
    const container = document.getElementById('chatbot-widget-root');
    if (container) {
      container.remove();
    }
    removeStyles();
  }
};

// For development, automatically initialize the widget if we're in a development environment
if (import.meta.env.DEV) {
  window.ChatbotWidget.init({
    apiHost: 'http://localhost:3000',
    chatflowid: 'demo-chatflow',
    theme: {
      chatWindow: {
        height: 600,
        width: 400,
      },
    },
  });
}
