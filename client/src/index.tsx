import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ShopProvider from "./context/Shopcontext";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopProvider>
        <GoogleOAuthProvider clientId="752850717401-7pdehffa713bcsetj5gh7nk3mo32boou.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </ShopProvider>
    </BrowserRouter>
  </React.StrictMode>
);
