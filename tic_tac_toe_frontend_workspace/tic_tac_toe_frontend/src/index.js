import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// No need for react-router-dom BrowserRouter here as App.js now wraps it

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
