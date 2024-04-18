import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Toaster } from "react-hot-toast"

import App from "./App.jsx";
import { antdConfig } from "constants";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={antdConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
    <Toaster />
  </StrictMode>
);
