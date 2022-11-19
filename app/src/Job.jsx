import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const generateRes = 'http://localhost:5000/generate_response';
async function getDataFromBackend() {
    // require cors
    const response = await fetch(generateRes, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}

export default function Job(props) {
    const [data, setData] = useState(null);
    const sendToInterview = () => {
        getDataFromBackend()
        .then((data) => {
            setData(data);
        });
    }
  return (
      <div>
        <p>{props.data.id}</p>
        <p>{props.data.job}</p>
        <p>{props.data.company}</p>

        <Link to="/interview" state={{
            id: props.data.id,
            job: props.data.job,
            company: props.data.company,
            data: data
        }} ><button onClick={() => sendToInterview()}  >Apply</button></Link>
        
      </div>
  )
}