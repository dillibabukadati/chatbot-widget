# Chatbot Widget

A beautiful, professional chatbot widget that can be easily embedded into any website. Built with React, TypeScript, and Tailwind CSS.

## Features

- Modern and professional UI design
- Support for streaming text responses
- Markdown preview with syntax highlighting
- Customizable theme and dimensions
- Easy to embed with a single script tag
- TypeScript support
- Fully responsive design

## Installation

1. Build the widget:
```bash
npm install
npm run build
```

2. The built files will be in the `dist` directory.

## Usage

Add the following script tags to your HTML:

```html
<!-- Add React and ReactDOM -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Add the widget script -->
<script src="https://dillibabukadati.github.io/chatbot-widget/chatbot-widget.umd.js"></script>
<!-- <script src="path/to/chatbot-widget.umd.js"></script> -->

<!-- Initialize the widget -->
<script>
  ChatbotWidget.init({
    apiHost: 'http://your-api-host',
    theme: {
      chatWindow: {
        height: 600, // optional
        width: 400, // optional
      },
    },
  });
</script>
```

## Configuration Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| apiHost | string | The URL of your chat API server | 'http://localhost:3000' |
| chatflowid | string | The ID of your chat flow | 'default' |
| theme.chatWindow.height | number | Height of the chat window in pixels | 600 |
| theme.chatWindow.width | number | Width of the chat window in pixels | 400 |

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

MIT
