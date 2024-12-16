import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import { CategoriesProvider } from "./context/CategoriesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CategoriesProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </CategoriesProvider>
  </React.StrictMode>
);
