import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Global error handler to avoid silent white screen
window.addEventListener('error', (ev) => {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.right = '0';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.color = 'white';
  overlay.style.padding = '16px';
  overlay.style.zIndex = '99999';
  overlay.innerText = `Runtime error: ${ev.message}`;
  document.body.appendChild(overlay);
});

window.addEventListener('unhandledrejection', (ev) => {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.left = '0';
  overlay.style.top = '0';
  overlay.style.right = '0';
  overlay.style.background = 'rgba(0,0,0,0.85)';
  overlay.style.color = 'white';
  overlay.style.padding = '16px';
  overlay.style.zIndex = '99999';
  overlay.innerText = `Unhandled Rejection: ${String(ev.reason)}`;
  document.body.appendChild(overlay);
});
