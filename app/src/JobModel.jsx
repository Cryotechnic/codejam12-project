import React from 'react';
import "./styles/JobModel.css"

export default function JobModel(props) {
  return (
    <div className = "popup-box">
      <div className = "box">
      <span className="close-icon" onClick={props.handleClose}>x</span>
        <p>{props.data.id}</p>
        <p>{props.data.job}</p>
        <p>{props.data.company}</p>
      </div>
    </div>
  )
}