import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

console.log('index.tsx loaded');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
console.log('ReactDOM.createRoot successful');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('React render called');