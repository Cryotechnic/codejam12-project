import React from 'react';
import Job from './Job'

let items = [
    {
        job: "Programmer", 
        id:1, 
        company: "Google"
    }, 
    {
        job: "Gamer", 
        id:2, 
        company: "Ubisoft"
    }, 
    {
        job: "Webber", 
        id:3, 
        company: "Marvel"
    }
];

export default function Landing() {
  return (
    <div>
        {items.map((obj, index) => {
          return <div key={index}> <Job data={obj}/> </div>
        })}
    </div>
  );
}