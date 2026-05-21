import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from "./context/CartContext";
import './index.css'
import App from './App.jsx'

// ─── DESKTOP RESOLUTION HOOK FOR THE PUBLIC FOLDER ICON ───
const injectTabIcon = () => {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    document.head.appendChild(link);
  }
  link.type = 'image/svg+xml';
  link.rel = 'icon';
  // window.location.origin forces the absolute root path (http://localhost:5173/favicon.svg)
  link.href = `${window.location.origin}/favicon.svg`;
};
injectTabIcon();
// ─────────────────────────────────────────────────────────

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);