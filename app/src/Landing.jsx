import React, {useState, useEffect} from 'react';
import Job from './Job'

const resLink = 'http://localhost:5000/job_data';
async function getJobData() {
  const response = await fetch(resLink, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  })
  const data = await response.json();
  return data;
}

export default function Landing() {

  const [items, setItems] = useState([])

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getToken() {
      const data = await getJobData()
      console.log(data)
      setItems(data.jobs);
    };

    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (items.length == 0) {
        getToken();
    }
  }, []);



  return (
    <div>
        {items.map((obj, index) => {
          return <div key={index}> <Job data={obj}/> </div>
        })}
    </div>
  );
}