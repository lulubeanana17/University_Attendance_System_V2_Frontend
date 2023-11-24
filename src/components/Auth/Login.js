import React, {useState} from 'react';
import axios from "axios";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginSucceed, setLoginSucceed] = useState(true);
    const [verifyLogin, setVerifyLogin] = useState(true);

    function usernameHandler(event) {
        setUsername(event.target.value);
    }

    function passwordHandler(event) {
        setPassword(event.target.value);
    }

    function login() {
        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/auth/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setLoginSucceed(true);
                localStorage.setItem("token", response.data.token);
                verifyUser(response.data.token);
            })
            .catch((error) => {
                setLoginSucceed(false);
                console.log(error);
            });
    }

    function verifyUser(token) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/attendance/verify_user/',
            headers: {
                'Authorization': 'Token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(typeof response.data.user_type);
                if(response.data.user_type === "admin") {
                    localStorage.setItem("userType", "admin");
                    window.open('/adminhome/', '_self');
                } else if(response.data.user_type === "lecturer") {
                    localStorage.setItem("userType", "lecturer");
                    window.open('/lecturerhome/', '_self');
                } else if(response.data.user_type === "student") {
                    localStorage.setItem("userType", "student");
                    window.open('/studenthome/', '_self');
                } else {
                    setVerifyLogin(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Username: <input type={"text"} onChange={usernameHandler}/></p>
            <p>Password: <input type={"password"} onChange={passwordHandler}/></p>
            {loginSucceed ? "" : <p style={{color: "red"}}>Username or password is incorrect</p>}
            {verifyLogin ? "" : <p style={{color: "red"}}>User is not registered as student, lecturer, or admin. contact admin to get registered</p>}
            <p>
                <button onClick={login}>Login</button>
            </p>
        </div>
    );
}

export default Login;