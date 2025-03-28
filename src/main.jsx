import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppEample from './AppExample.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppEample />
  </StrictMode>,
);
