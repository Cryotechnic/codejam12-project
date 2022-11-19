import React from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import InterviewPage from './InterviewPage';

export default function Job(props) {
  return (
      <div>
        <p>{props.data.id}</p>
        <p>{props.data.job}</p>
        <p>{props.data.company}</p>

        <Link to="/interview" state={{
            id: props.data.id,
            job: props.data.job,
            company: props.data.company
        }} ><button>Apply</button></Link>
        <Link to="/jobmodel" state={{
            data: JSON.parse(JSON.stringify(props.data))
        }} ><button>Details</button></Link>
        {/* <Routes>
                <Route path="/interview" element={<InterviewPage/>}/>
        </Routes> */}
        
      </div>
  )
}