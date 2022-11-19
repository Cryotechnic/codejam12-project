import React from 'react';
import "./styles/JobModel.css"

export default function JobModel(props) {
  return (
    <div className = "popup-box">
      <div className = "box">
      <span className="close-icon" onClick={props.handleClose}>x</span>
        <p>{props.data.job_id}</p>
        <p>{props.data.job_title}</p>
        <p>{props.data.job_company}</p>
      </div>
    </div>
  )
}