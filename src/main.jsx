import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';

import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position='top-right' />
    <App />
  </StrictMode>
);
