export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export interface ChatbotProps {
  apiHost?: string;
  chatflowid?: string;
  theme?: {
    chatWindow?: {
      height?: number;
      width?: number;
    };
  };
}