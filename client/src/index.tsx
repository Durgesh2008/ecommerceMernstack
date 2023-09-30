import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopProvider from './context/Shopcontext';
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ShopProvider>
    <App />
    </ShopProvider>
    </BrowserRouter>
  </React.StrictMode>
);


