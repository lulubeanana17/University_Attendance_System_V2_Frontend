import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {Form} from 'react-bootstrap';
import course from "../Courses/Course";

function CreateOneUser(props) {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");


    function usernameHandler(event) {
        setUsername(event.target.value);
    }

    function passwordHandler(event) {
        setPassword(event.target.value);
    }

    function firstnameHandler(event) {
        setFirstname(event.target.value);
    }

    function lastnameHandler(event) {
        setLastname(event.target.value);
    }

    function createUser() {
        let data = JSON.stringify({
            "username": username,
            "password": password,
            "first_name": firstname,
            "last_name": lastname
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/attendance/api/users/',
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <p>Username: <input onChange={usernameHandler} type={"text"}/></p>
            <p>Password: <input onChange={passwordHandler} type={"text"}/></p>
            <p>Firstname: <input onChange={firstnameHandler} type={"text"}/></p>
            <p>Lastname: <input onChange={lastnameHandler} type={"text"}/></p>
            <button onClick={createUser}><Link to={`/`}>Create a user</Link></button>
        </div>
    );
}

export default CreateOneUser;