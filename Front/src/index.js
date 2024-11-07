import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import App from './App'; // Renderiza el App que contiene el Router
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />  {/* Cambia Login por App */}
  </React.StrictMode>
);

reportWebVitals();

