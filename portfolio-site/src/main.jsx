import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const about = ReactDOM.createRoot(document.getElementById('about'));
about.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
