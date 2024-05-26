import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';
import './App.css';


function PostAttendance() {
    const userContext = useContext(UserContext);

  
  const [employeeId, setEmployeeId] = useState(userContext.user ? userContext.user.employeeId : '');
  const [type, setType] = useState('checkIn');
  const [location,setLocation] = useState('office');
  const [remarks,setRemarks] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  }

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  }

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  }
  const handleSubmit = () => {
    fetch('http://localhost:5000/attendance/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId, recordType:type,location,remarks }),
    }).then(response => {
      if (!response.ok) {
        console.log(response)
        // console.log("response",response)
        throw new Error('There was an error');
      }
      else {
        alert("Attendance posted successfully");
        setEmployeeId("");
        setType("checkIn");
        setLocation("office");
        setSuccessMessage("");
        setRemarks("");
      }
      // return response.json();
    })
      .catch((error) => {
        console.log(error)
        alert(error);
      });
  }



  return (
    <>
        {userContext.user ? <>
          <div className="card">
                <div className="card-body">
                  <div className="card-header">
                  Attendance
                  </div>
                  {/* <label>
                  Employee ID:
                  <input type="text" value={employeeId} onChange={handleEmployeeIdChange} className="form-control"/>
                  </label>
                  <br/> */}
                  <br/>

                  <label>
                  Work From:
                  <select value={location} onChange={handleLocationChange} className="form-control">
                    <option value="office">Office</option>
                    <option value="remote">Remote</option>
                  </select>
                  </label>

                  <br/>
                  <br/>
                  <label>
                  Checkin/Checkout:
                  <select value={type} onChange={handleTypeChange} className="form-control">
                    <option value="checkIn">Check In</option>
                    <option value="checkOut">Check Out</option>
                  </select>
                  </label>
                  <br/>
                  <br/>


                  <br></br>
                  <label>
                  Remarks :
                  <input type="text" value={remarks} onChange={handleRemarksChange} className="form-control"/>
                  </label>
                  <br/>
                  <br/>

                  <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
                  <div>{successMessage}</div>


                      </div>

            </div>
        </> :
        <>
     
        </>}
   

   
   
    </>
  );
}

export default PostAttendance;
