import React, { useState,useEffect, useContext } from 'react';
import './App.css';
import PostAttendance from './PostAttendance';
import GetAttendance from './GetAttendance';
import Login from './components/login/Login';
import AttendanceByDate from './AttendanceByDate';
import { UserContext } from './context/UserContext';
import { PageContext } from './context/PageContext';
import PostLeaveRequest from './PostLeaveRequest';

function App() {
  // const UserContext = useContext(UserContext);
  const [user, setUser] = useState(null);

  const [userFetched, setUserFetched] = useState(false);

  const [currentPage,setCurrentPage] = useState("postAttendance");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changePage = (page) => {
    setCurrentPage(page)
  }

  console.log("user",user)
  async function fetchUser () {
    const res = await fetch("http://localhost:5000/auth/", {
          credentials: 'include',
          method: 'GET', 
          headers: {
              'Content-Type': 'application/json',
          }
      });

    if (res.status==200){
      const data = await res.json();
      if (data){
          if (!data.errors) 
            {
              setUser(data);
            }
      }
    }
    else {

      console.log(res)
    }

    setUserFetched(true);

 
  }



  useEffect(() => {
      if (!userFetched) {
        fetchUser();
      }
  },[userFetched])
  
  return (
    <>
    {user ? <>
      &nbsp; Welcome 
      &nbsp;{user.name}
      {/* &nbsp;{user.name} */}
    </>:
    <>
      <a
      href="#"
      onClick={ ()=>{
        changePage('loginPage')
      }} 
      > 
        Login
        </a>
    </>}
    <UserContext.Provider value={{user,setUser,userFetched,setUserFetched}}>
    <PageContext.Provider value={{currentPage,setCurrentPage,isLoggedIn,setIsLoggedIn}}>
    <div className="p-2"> 
    {userFetched}
   
   
    {user ? 
    <>
    <div className="jumbotron">
      <h4>  Zero By Zero Sys. </h4>
    </div>
    <div>
      <a href="#" onClick={()=>{
        changePage("postAttendance")
      }}
      className={(currentPage!="postAttendance")? "btn btn-outline-dark" : "btn btn-primary"}> Post Attendance </a>
     
      {user.role=="admin" &&
      <>&nbsp;
      &nbsp; <a href="#" onClick={()=>{
        changePage("getAttendance")
      }}
      className={(currentPage!="getAttendance")? "btn btn-outline-dark" : "btn btn-dark"}>Get Attendance</a>
      &nbsp;
      &nbsp; </>}      
     
     
     
        <a 
        className={(currentPage!="attendanceByDate")? "btn btn-outline-dark" : "btn btn-dark"}
      href="#"
      onClick={ ()=>{
        changePage('attendanceByDate')
      }} 
      > 
        By date
        </a>
      &nbsp;
      &nbsp;      

        <a 
        className={(currentPage!="postLeave")? "btn btn-outline-dark" : "btn btn-dark"}
      href="#"
      onClick={ ()=>{
        changePage('postLeave')
      }} 
      > 
        Post Leave
        </a>


    </div>

      </>: <>
      </>}

    <br></br>


     
     {(currentPage=="postAttendance") && <PostAttendance /> }
     {(currentPage=="getAttendance") && <GetAttendance /> }
     {(currentPage == "loginPage") && <Login />}
     {(currentPage == "attendanceByDate") && <AttendanceByDate />}
     {(currentPage == "postLeave") && <PostLeaveRequest />}
     

     {/* { currentPage == "postAttendance" ? <PostAttendance /> :<GetAttendance /> } */}
    
    </div>  
    </PageContext.Provider>
  </UserContext.Provider>

    </>
  );
}

export default App;
