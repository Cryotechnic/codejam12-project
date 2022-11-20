import React from "react";
import ChatBot from "react-simple-chatbot";

function handleEnd({ steps, values }) {
    console.log(values);
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