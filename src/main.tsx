import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { Toaster } from "sonner"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="top-center" toastOptions={{ unstyled: true, classNames: { toast: "right-0 left-0" }, duration: 8000 }} pauseWhenPageIsHidden />
    <App />
  </React.StrictMode>,
)
