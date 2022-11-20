import React from 'react';

export default function JobModel(props) {
  return (
    <div>
        <p><b>Job ID: </b>{props.data.job_id}</p>
        <p><b>Job Title: </b>{props.data.job_title}</p>
        <p><b>Company: </b>{props.data.job_company}</p>
        <p><b>Job Description: </b>{props.data.job_description}</p>
        <p><b>Job Skills: </b></p>
        <ul>
          {props.data.job_skills.map((obj, index) => {
            return <li key={index}> {obj} </li>
          })}
        </ul>
    </div>
  )
}