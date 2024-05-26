import React, { useState } from 'react';

function GetLeaveRequests() {
  const userContext = useContext(UserContext);

  const [employeeId, setEmployeeId] = useState(userContext.user ? userContext.user.employeeId : '');
  
  const [attendanceData, setAttendanceData] = useState([]);

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  }

  const fetchData = () => {
    // Replace 'http://localhost:5000' with the actual server URL
    const serverURL = 'http://localhost:5000/leave-request/';

    fetch(`${serverURL}${employeeId}`)
      .then((response) =>{
        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
          }
       return response.json()})
      .then((data) => {
        console.log(data)
        setAttendanceData(data);
      })
      .catch((error) => {
        alert(error)
      });
  }

  function formatDate(dateVar) {
    const date = new Date(dateVar);
    const currentMonth = date.getMonth();
    const monthString = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;
    const currentDate = date.getDate();
    const dateString = currentDate >= 10 ? currentDate : `0${currentDate}`;
    return `${date.getFullYear()}-${monthString}-${currentDate}`;
}

function formatTime(dateVar) {
    const jsDate = new Date(dateVar);
    const hours = jsDate.getHours();
    const minutes = jsDate.getMinutes();
    const seconds = jsDate.getSeconds();
    return `${hours} : ${minutes}: ${seconds}`;
}

  return (
    <>
    <div className="card">
        <div className="card-body">
            <div className="card-header">
      <h1>Employee Leave Request</h1>
        </div>
      
     &nbsp; <button onClick={fetchData} className="btn btn-primary">Fetch Leave Requests</button>
      </div>
    </div>
      <div>
        <h2>Attendance Data</h2>
        <table className="table">
            <thead>
                <th scope="col">
                    #
                </th>
                <th scope="col">
                    Date
                </th>
                <th scope="col">
                    Time
                </th>
                <th scope="col">
                    Location
                </th>
                <th scope="col">
                    Type
                </th>
                <th scope="col">
                    Remarks
                </th>
            </thead>
        <tbody>
          {attendanceData.map((attendanceRecord, index) => (
            <tr key={index}>
                <th scope="row">
                    {index+1}
            </th>

            <td> {formatDate(attendanceRecord.createDate)}
            </td>
             <td> {formatTime(attendanceRecord.createDate)} </td>
             
             <td> {attendanceRecord.location} </td>
             
             <td> {attendanceRecord.recordType} </td>

             <td> {attendanceRecord.remarks} </td>

             </tr>
          ))}
        </tbody>
        </table>
        </div>
      
    </>
  );
}

export default GetLeaveRequests;