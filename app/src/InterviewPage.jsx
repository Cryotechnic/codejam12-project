import React from 'react';
import ChatBot from 'react-simple-chatbot';

// async function getDataFromBackend() {
//     console.log("getDataFromBackend");
//     const response = await fetch('http://localhost:5000/generate_response');
//     const data = await response.json();
//     console.log(data);
// }

function callApi() {
    fetch('http://localhost:5000/generate_response', { method: 'GET' })
      .then(res => res.json()) // Parsing the data into a JavaScript object
      .then(json => alert(JSON.stringify(json))) // Displaying the stringified data in an alert popup
}



export default function InterviewPage() {

    return (
        <div>
            <h1>Interview Page</h1>
            <button onClick={callApi} >Generate</button>
            <ChatBot
                steps={[
                    {
                        id: '1',
                        message: 'What is your name?',
                        trigger: '2',
                    },
                    {
                        id: '2',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '3',
                        message: 'Hi {previousValue}, nice to meet you!',
                        end: true,
                    },
                ]}
                style={{ width: '90%', padding: '10px', margin: 'auto' }}
            />
        </div>
    );
}