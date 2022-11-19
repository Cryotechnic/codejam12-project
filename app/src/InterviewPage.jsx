import React, {useState} from 'react';
import ChatBot from 'react-simple-chatbot'
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';


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

    console.log(data);
    // construct the steps by iterating through the data, and adding the questions, and every second question, the answer
    for (let i = 0; i < data.length; i++) {
        //if we are at the last question, we need to add the end step
        if (i === data.length - 1) {
            conSteps.push({
                id: ctr.toString(),
                message: 'Thanks! Your answers have been submitted.',
                end: true,
            });
        }
        //if we are at a question, we need to add the question and the answer
        else {
            conSteps.push({
                id: ctr.toString(),
                message: data[i],
                trigger: (ctr + 1).toString(),
            });
            ctr++;
            conSteps.push({
                id: ctr.toString(),
                user: true,
                trigger: (ctr + 1).toString(),
            });
            ctr++;
        }
    }

    conSteps.map((e) => console.log(e));



    return (
        <div>

            <Typography variant="h6" style={{ textAlign: 'center' }}>
                <h1>{job} at {company}</h1>
            </Typography>
            <ChatBot
                handleEnd={handleEnd}
                steps={conSteps}
                style={{ width: '90vw', height: 'auto', marginLeft: '5vw', marginTop: '5vh' }}
            />

        </div>
    );
}