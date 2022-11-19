import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Landing";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}