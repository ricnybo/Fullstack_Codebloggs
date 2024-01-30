import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./components/AuthContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
axios.defaults.withCredentials = true;

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <AuthProvider>
      
        <App />
      
    </AuthProvider>
  </React.StrictMode>
);
