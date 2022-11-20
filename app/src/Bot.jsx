import React from "react";
import ChatBot from "react-simple-chatbot";

function handleEnd({ steps, values }) {
    console.log(steps);
    console.log(values);
    postForAnalysis({steps, values});
}

async function postForAnalysis({steps, values}) {
    const response = await fetch("http://localhost:5000/analysis", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
                            steps: steps, 
                            values: values
                        }),
    });
    const data = await response.json();
    console.log(data);
}

export default function Bot(props) {
    return (
        <ChatBot
            steps={props.steps}
            handleEnd={handleEnd}
            style={{ width: '90vw', height: 'auto', marginLeft: '5vw', marginTop: '5vh' }}
        />
    );
}