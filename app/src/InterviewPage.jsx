import React, {useState} from 'react';
import ChatBot from 'react-simple-chatbot'
import { useLocation } from 'react-router-dom';
import { script } from "./chatbot";
import { stepifyScript } from "./utils";

// const originalData = [
//     "What experience do you have with C++?",
//     "What are some of the challenges you have faced with C++ programming?",
//     "What is your experience with object-oriented programming in C++?",
//     "What do you know about using templates in C++?",
//     "What libraries or frameworks have you used in your C++ projects?",
//     "What is your experience with algorithms and data structures in C++?",
//     "What are some of the design patterns that you are familiar with?",
//     "What do you think makes C++ a powerful tool for software engineering?"
// ]
  

// const generateRes = 'http://localhost:5000/generate_response';
// async function getDataFromBackend() {
//     // require cors
//     const response = await fetch(generateRes, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     return await response.json();
// }

export default function InterviewPage() {
    const location = useLocation();
    const id = location.state.id;
    const job = location.state.job;
    const company = location.state.company;
    const data = location.state.data;
    
    function handleEnd({ steps, values }) {
        console.log(values);
    }

    const conSteps = [];
    let ctr = 0;

    return (
        <div>

            <h1>Interview Page {id} for {job} at {company}</h1>
            {/* <button onClick={() => {
                getDataFromBackend()
                .then((data) => {
                    data.map((item) => {
                        console.log(item);
                    });
                    setData(data);
                });
            }} >Trigger</button> */}
            {<p>{data}</p>}
            <ChatBot
                handleEnd={handleEnd}
                steps={conSteps}
            />

        </div>
    );
}