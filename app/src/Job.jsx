import React, {useState} from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import InterviewPage from './InterviewPage';
import JobModel from './JobModel';
import Button from '@mui/material/button';


const Job = props => {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log("panchod")
  }

  return (
      <div>
        <p>{props.data.job_id}</p>
        <p>{props.data.job_title}</p>
        <p>{props.data.job_company}</p>

        <Link style={{ textDecoration: 'none'}} to="/interview" state={{
            id: props.data.job_id,
            job: props.data.job_title,
            company: props.data.job_company
        }} ><Button variant="contained">Apply</Button></Link>
        <Button variant="contained" onClick={togglePopup}>Details</Button>
        {isOpen && <JobModel
          data = {JSON.parse(JSON.stringify(props.data))}
          handleClose={togglePopup}
        />}
        {/* <Routes>
                <Route path="/interview" element={<InterviewPage/>}/>
        </Routes> */}
        
      </div>
  )
}

export default Job;
