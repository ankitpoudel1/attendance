import { useEffect, useState } from "react";

const Login = () =>{

    const [empId, setEmpId] = useState("");
    const [password, setPassword] = useState("");
    const [empIdErr, setEmpIdErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const url = "http://localhost:5000/auth/";

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('form submit')
        setEmpIdErr(empId? "":"Enter Employee Id ");
        setPasswordErr(password?"":"Enter Password");

        const userData = {"employeeId":empId,"password":password};

        const requestOptions = {
            method: 'POST',
            // withCredentials: true,
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('data',data);
                // setIsLoggedIn(true);
            } ).catch((error) => {
                console.log("login error",error)
                // alert(error);
              });
    };

    return (
        <>
        <div className="container">
            <div className="text-center">
            Employee Id :
            <input
            type="text"
            name="empId"
            className="form-control"
            value={empId}
            onChange={(e)=>{
                setEmpId(e.target.value);
            }}
            />
            <br />
            Password : 
            <input 
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value);
            }}
            />
            <br />
            <input
            type="submit"
            value="submit"
            onClick={handleSubmit}
            />
            </div>
        </div>
        </>
    )
};
export default Login