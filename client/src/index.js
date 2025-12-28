import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * The index.js file is the "Entry Point" of your React application.
 * It tells React exactly where to inject your code into the HTML file.
 */

// 1. Find the <div> with the id of 'root' in your public/index.html file
const rootElement = document.getElementById('root');

// 2. Create a React root using the new createRoot API (React 18+)
const root = ReactDOM.createRoot(rootElement);

// 3. Render the App component inside the root
// <React.StrictMode> is a tool for highlighting potential problems in an application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);