import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function UpdateOneSemester() {
    const {semesterId} = useParams();
    const [semester, setSemester] = useState("");
    const [year, setYear] = useState("");
    const [token, setToken] = useState("");

    function semesterHandler(event) {
        setSemester(event.target.value);
    }

    function yearHandler(event) {
        setYear(event.target.value);
    }

    const updateSemester = () => {
        let data = JSON.stringify({
            "semester": semester,
            "year": year
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/semesters/${semesterId}/`,
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [])

    return (
        <>
            <h3>Update the semester</h3>
            <p>Semester: <input onChange={semesterHandler} type={"text"}/></p>
            <p>Year: <input onChange={yearHandler} type={"text"}/></p>
            <button onClick={updateSemester}><Link to={`/getallsemester/getonesemester/${semesterId}`}>Update the semester</Link></button>
        </>
    );
}

export default UpdateOneSemester;