import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import InterviewPage from "./InterviewPage";

export default function App() {

  return (
    <BrowserRouter>

        <Link to="/interview">InterviewPage</Link>
        <Routes>
                <Route path="/interview" element={<InterviewPage />}/>
        </Routes>
    </BrowserRouter>
  );
}