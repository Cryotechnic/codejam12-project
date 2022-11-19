import React from "react";
import Landing from "./Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InterviewPage from "./InterviewPage";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/interview" element={<InterviewPage />}/>
            <Route path="/*"/>
      </Routes>
    </BrowserRouter>
  );
}