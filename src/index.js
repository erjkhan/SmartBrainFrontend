import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'tachyons' ;

const container = document.getElementById('app');
if (!container) {
  console.error("Container element with id 'app' not found in the document.");
} else {
  // Create a root to render the React component
  const root = createRoot(container);
  root.render(<App tab="home" />);

  reportWebVitals();
}
