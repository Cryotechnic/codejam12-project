import React, {useEffect, useState} from 'react';
import Bot from './Bot'
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

// async function to post candidate id to backend at /selected_candidate
async function postCandidateId(id) {
    const response = await fetch('http://localhost:5000/selected_job', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id}),
    })
    const data = await response.json();
    return data;
}

const genResLink = 'http://localhost:5000/generate_response';
async function getResData() {
  const response = await fetch(genResLink, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  })
  const data = await response.json();
  return data;
}

export default function InterviewPage() {
    const location = useLocation();
    const id = location.state.id;
    const job = location.state.job;
    const company = location.state.company;
    const [data, setData] = useState([])
    // before rendering, post candidate id to backend and get response data, do not render until data is received, do not get response data until candidate id is posted
    useEffect(() => {
        postCandidateId(id).then(() => {
            console.log("posted candidate id: " + id);
            async function getToken() {
                const data = await getResData()
                console.log(data)
                setData(data);
            };
            if (data.length == 0) {
                getToken();
            }
        }
    )}, []);

    // compile response data into steps for chatbot
    let finalScript = [];
    let ctr = 0;
    for (let i = 0; i < data.length*2 - 1; i++) {
        if (i % 2 == 0) {
            finalScript.push(
                {
                    id: i.toString(),
                    message: data[ctr],
                    trigger: (i+1).toString(),
                }
            )
        } else {
            finalScript.push(
                {
                    id: i.toString(),
                    user: true,
                    trigger: (i+1).toString(),
                }
            )
            ctr++;
        }
    }
    finalScript.push(
        {
            id: (data.length*2-1).toString(),
            user: true,
            trigger: (data.length*2).toString(),
        }
    )
    finalScript.push(
        {
            id: (data.length*2).toString(),
            message: "Thank you for your time!",
            end: true,
        }
    )
    console.log(finalScript);
    // only render chatbot once data is received
    if(data.length != 0 && finalScript.length != 0) {
        return (
            <div>
                <Typography variant="h3" style={{ textAlign: 'center' }}>
                    <h3>AI Interview for {job} at {company}</h3>
                </Typography>
                <Bot steps={finalScript}/>
                <Link to="/interview"><Button>End Interview</Button></Link>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

}