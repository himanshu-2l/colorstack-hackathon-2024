import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.jsx";
import Problems from "./pages/Problems.jsx";
import LostFoundFeed from "./pages/LostFoundFeed.jsx";
import Layout from "./pages/Layout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route path="/login" index={false} element={<Login />} />
          <Route path="/problems" index={false} element={<Problems />} />
          <Route path="/lost_found" index={false} element={<LostFoundFeed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
