import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css'; // 이걸 사용 중이니까 이걸로 바꿔

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
