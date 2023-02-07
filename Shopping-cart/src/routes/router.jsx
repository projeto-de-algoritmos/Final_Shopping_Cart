import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/home";
import PublicOutlet from "./PublicOutlet";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicOutlet />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}