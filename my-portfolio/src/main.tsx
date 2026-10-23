import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { applyStoredTheme } from './theme';
import './index.css';
import App from './App.tsx';

applyStoredTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
