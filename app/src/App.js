import React from "react";
import Landing from "./Landing";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import InterviewPage from "./InterviewPage";
import background from "./styles/cool-background.png"

export default function App() {

  return (
    <div style={{ 
      // backgroundImage: `url("https://via.placeholder.com/500")`,
      backgroundImage: `url(${background})`,
      height: "100%"
    }}>
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/interview" element={<InterviewPage />}/>
              <Route path="/*"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}