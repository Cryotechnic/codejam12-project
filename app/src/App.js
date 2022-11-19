import React from "react";
import Landing from "./Landing";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import InterviewPage from "./InterviewPage";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
      </Routes>

        <Link to="/interview">InterviewPage</Link>
        <Routes>
                <Route path="/interview" element={<InterviewPage />}/>
        </Routes>
    </BrowserRouter>
  );
}