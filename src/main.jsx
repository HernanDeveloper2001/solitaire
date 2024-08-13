import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ContextDeckProvider } from "./contextDeck-card/ContextDeckProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextDeckProvider>
      <App />
    </ContextDeckProvider>
  </StrictMode>
);
