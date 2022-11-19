import React from 'react';
import { useLocation } from 'react-router-dom';

export default function JobModel(props) {
  const location = useLocation();
  const data = location.state.data
  return (
    <div>
        <p>{data.id}</p>
        <p>{data.job}</p>
        <p>{data.company}</p>
    </div>
  )
}