import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function UpdateOneLecturer() {
    const {lecturerId} = useParams();
    const {userId} = useParams();
    const [DOB, setDOB] = useState("");
    const [token, setToken] = useState("");

    function dobHandler(event) {
        setDOB(event.target.value);
    }

    const updateLecturer = () => {
        let data = JSON.stringify({
            "dob": DOB,
            "lecturerInfo": userId
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/lecturers/${lecturerId}/`,
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
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h3>Update the lecturer</h3>
                <p>Date of Birth: <input onChange={dobHandler} type={"text"}/></p>
                <button onClick={updateLecturer}><Link to={`/getalllecturer/getonelecturer/${lecturerId}`}>Update the lecturer</Link>
                </button>
            </div>
        </>
    );
}

export default UpdateOneLecturer;