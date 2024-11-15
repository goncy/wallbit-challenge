import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./utilities/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    <Toaster
      toastOptions={{
        className: "",
        style: {
          border: "1px solid #713200",
          padding: "16px",
        },
      }}
    />
    </ThemeProvider>
  </StrictMode>
);
