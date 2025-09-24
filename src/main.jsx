import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';

// i18n removed; strings now resolved via shim alias

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position='top-right' />
    <App />
  </StrictMode>
);
