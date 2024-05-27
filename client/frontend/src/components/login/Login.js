import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Login = () =>{
    const userContext = useContext(UserContext);


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
                // console.log('data',data);
                userContext.setUser(data);
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
            <div class="card custom-card">
                <div class="card-body">
                <h5 class="card-title">Login</h5>
                    <p class="card-text">
                        <div>
                            <div>
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
                            </div>
                            <br />
                            <div>
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
                            </div>
                            <br />
                        <input
                        className="btn btn-primary"
                        type="submit"
                        value="Login"
                        onClick={handleSubmit}
                        />
                        </div>
                    </p>
                </div>
            </div>
                
            </div>
        </div>
        </>
    )
};
export default Login