import { App } from "./app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { mapProviders } from "./app/providers";
import "./assets/styles/index.scss"

createRoot(document.getElementById("root")!).render(
  mapProviders(
    <App />)
);
