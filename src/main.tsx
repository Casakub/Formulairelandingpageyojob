import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initAnalytics } from "./lib/analytics";
import "./index.css";
import "./styles/globals.css";

initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);