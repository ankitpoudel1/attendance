import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';
import './App.css';


function PostLeaveRequest() {
    const userContext = useContext(UserContext);

  
  const [employeeId, setEmployeeId] = useState(userContext.user ? userContext.user.employeeId : '');
  const [type, setType] = useState('checkIn');
  const [location,setLocation] = useState('office');
  const [remarks,setRemarks] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  }
  const handleSubmit = () => {
    fetch('http://localhost:5000/leave-request/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId, remarks }),
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

                  

                  <br/>
                  <br/>
                  
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

export default PostLeaveRequest;
