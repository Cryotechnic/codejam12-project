import React, {useState} from 'react';
import {Route, Routes, Link} from 'react-router-dom';
import InterviewPage from './InterviewPage';
import JobModel from './JobModel';


const Job = props => {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log("panchod")
  }

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
        <input
          type="button"
          value="Details"
          onClick={togglePopup}
        />
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
