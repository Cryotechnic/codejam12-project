import React from "react";
import Landing from "./Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InterviewPage from "./InterviewPage";
import JobModel from "./JobModel"

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/interview" element={<InterviewPage />}/>
            <Route path="/*"/>
            <Route path="/jobmodel" element={<JobModel />}/>
      </Routes>
    </BrowserRouter>
  );
}