import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Unconditionally ensure Service Worker is registered for PWA support
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .catch((err) => console.log("SW registration notice:", err));
  });
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
