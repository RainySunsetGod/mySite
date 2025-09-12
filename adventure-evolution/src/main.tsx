// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App"; // Your game logic
import About from "./pages/About"; // The new About page
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        {/* Add more static pages here in the future */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
