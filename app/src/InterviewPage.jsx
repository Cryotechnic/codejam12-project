import React, {useState} from 'react';
// import ChatBot from 'react-simple-chatbot';

const generateRes = 'http://localhost:5000/generate_response';
async function getDataFromBackend() {
    // require cors
    const response = await fetch(generateRes, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}

export default function InterviewPage() {

    const [data, setData] = useState(null);

    return (
        <div>
            <h1>Interview Page</h1>
            <button onClick={() => {
                
                getDataFromBackend()
                .then((data) => {
                    data.map((item) => {
                        console.log(item);
                    });
                    setData(data);
                });
            }} >Trigger</button>
            <p>{data}</p>

            {/* <ChatBot
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
            /> */}
        </div>
    );
}