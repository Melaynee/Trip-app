import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

const CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_AUTH_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
