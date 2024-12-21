import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '.public/styles/custom.css'; // Importing custom styles globally

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
