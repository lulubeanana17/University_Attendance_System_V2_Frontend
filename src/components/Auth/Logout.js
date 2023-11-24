import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import axios from "axios";
import {Link} from "react-router-dom";

function Logout(props) {
    const [token, setToken] = useState("");

    function logout() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/auth/logout/',
            headers: {
                'Authorization': 'token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                localStorage.removeItem("token");
                localStorage.removeItem("userType");
                window.open('/', '_self');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [token])

    return (
        <div>
            <h3>Are you sure you want to logout now?</h3>
            <Button onClick={logout} style={{marginRight: "2rem"}}>Yes</Button>
            <Button><Link to={`/`} style={{color: "white", textDecoration: "none"}}>No</Link></Button>
        </div>
    );
}

export default Logout;