import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import store from './store/store';

// i18n removed; strings now resolved via shim alias

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position='top-right' />
      <App />
    </Provider>
  </StrictMode>
);
