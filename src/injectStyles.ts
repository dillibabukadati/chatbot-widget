export function injectStyles(styles: string) {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('type', 'text/css');
  styleElement.setAttribute('data-chatbot-widget', '');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export function removeStyles() {
  const styleElement = document.querySelector('style[data-chatbot-widget]');
  if (styleElement) {
    styleElement.remove();
  }
}