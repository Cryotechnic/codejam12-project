import React from 'react';

export default function Job(props) {
  return (
      <div>
        <p>{props.data.id}</p>
        <p>{props.data.job}</p>
        <p>{props.data.company}</p>
        <button>Apply</button>
        
      </div>
  )
}