// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use this for React 18
import './index.css'; // Global styles
import App from './App'; // Main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root element for React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

