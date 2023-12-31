import React, { useState,useEffect } from 'react';
import './App.css';
import PostAttendance from './PostAttendance';
import GetAttendance from './GetAttendance';
import Login from './components/login/Login';
import AttendanceByDate from './AttendanceByDate';
import { UserContext } from './context/UserContext';
import { PageContext } from './context/PageContext';

function App() {
  const [user, setUser] = useState(null);
  const [userFetched, setUserFetched] = useState(false);

  const [currentPage,setCurrentPage] = useState("postAttendance");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changePage = (page) => {
    setCurrentPage(page)
  }

  // async function fetchUser () {
  //   const res = await fetch("http://localhost:5000/auth/", {
  //         credentials: 'include',
  //         method: 'GET', 
  //         headers: {
  //             'Content-Type': 'application/json',
  //         }
  //     });

  //   if (res.status==200){
  //     const data = await res.json();
  //     if (data){
  //         if (!data.errors) setUser(data);
  //     }
  //   }

  //   setUserFetched(true);

 
  // }



  // useEffect(() => {
  //     if (!userFetched) {
  //       fetchUser();
  //     }
  // },[userFetched])
  
  return (
    <>
    <UserContext.Provider value={{user,setUser,userFetched,setUserFetched}}>
    <PageContext.Provider value={{currentPage,setCurrentPage,isLoggedIn,setIsLoggedIn}}>
    <div className="p-2"> 
    {userFetched}
    <div className="jumbotron">
      <h4>  Attendance System </h4>
    </div>
    <div>
      <a href="#" onClick={()=>{
        changePage("postAttendance")
      }}
      className={(currentPage!="postAttendance")? "btn btn-outline-dark" : "btn btn-dark"}> Post Attendance </a>
      &nbsp;
      &nbsp; <a href="#" onClick={()=>{
        changePage("getAttendance")
      }}
      className={(currentPage!="getAttendance")? "btn btn-outline-dark" : "btn btn-dark"}>Get Attendance</a>
      &nbsp;
      &nbsp;      
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
        <a
       className={(currentPage!="loginPage")? "btn btn-outline-dark ml-4" : "btn btn-dark"}
      href="#"
      onClick={ ()=>{
        changePage('loginPage')
      }} 
      > 
        Login
        </a>


    </div>
    <br></br>
     
     {(currentPage=="postAttendance") && <PostAttendance /> }
     {(currentPage=="getAttendance") && <GetAttendance /> }
     {(currentPage == "loginPage") && <Login />}
     {(currentPage == "attendanceByDate") && <AttendanceByDate />}
     

     {/* { currentPage == "postAttendance" ? <PostAttendance /> :<GetAttendance /> } */}
    
    </div>  
    </PageContext.Provider>
  </UserContext.Provider>

    </>
  );
}

export default App;
