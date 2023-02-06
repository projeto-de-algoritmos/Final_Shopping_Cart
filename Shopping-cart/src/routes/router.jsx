import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Router() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicOutlet />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}