import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import JobModel from './JobModel';

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

const genResLink = 'http://localhost:5000/generate_response';
async function getResData() {
  const response = await fetch(genResLink, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
  })
  const data = await response.json();
  return data;
}

export default function Landing() {

  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log("panchod")
  }

    const [items, setItems] = useState([])
    const [resItems, setResItems] = useState([])

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

    useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        async function getToken() {
            const data = await getResData()
            console.log(data)
            setResItems(data);
        };

        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (resItems.length == 0) {
            getToken();
        }
    }, []);

  function createData(id, title, company) {
    return { id, title, company };
  }

  // actual data
  const rows = [
    // createData('Value', 159, 6.0)
    // createData()
  ]

  items.forEach((elem) => {
    rows.push(createData(elem.job_id, elem.job_title, elem.job_company))
  })

  // return (
  //   <div>
  //       {items.map((obj, index) => {
  //         return <div key={index}> <Job data={obj}/> </div>
  //       })}
  //   </div>
  // );

    return (
      <div>
        <h1 style={{textAlign: "center"}}>JobSmart</h1>
        <TableContainer sx={{mx:'auto', width: '52%'}} component={Paper} style={{borderRadius: 12.5}}>
          <Table sx={{minWidth: 650, width: '52%'}} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Job ID</TableCell>
                <TableCell align="center">Job Title</TableCell>
                <TableCell align="center">Job Company</TableCell>
                <TableCell align="center">&#10240;</TableCell>
                <TableCell align="center">&#10240;</TableCell>
                <TableCell align="center">Actions</TableCell>
                <TableCell align="center">&#10240;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.company}</TableCell>
                  <TableCell align="center">&#10240;</TableCell>
                  
                  <TableCell align="center">        
                  
                        <Link style={{ textDecoration: 'none'}} to="/interview" state={{
                            id: row.id,
                            job: row.title,
                            company: row.company,
                            data: resItems
                        }} ><Button variant="contained">Apply</Button>
                        </Link>
                    </TableCell>
                  <TableCell align="center"><Button variant="contained" onClick={togglePopup}>Details</Button>
        {isOpen && <JobModel
          data = {JSON.parse(JSON.stringify(items[rows.indexOf(row)]))}
          handleClose={togglePopup}
        />}</TableCell>
                  <TableCell align="center">&#10240;</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }