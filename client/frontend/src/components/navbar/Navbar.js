import { UserContext } from "../../context/UserContext";
import { PageContext } from "../../context/PageContext";
export default function Navbar(){
    return (<>
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
    </>)
}