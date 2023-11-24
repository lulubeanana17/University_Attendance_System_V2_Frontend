import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function CreateOneSemester(props) {
    const [semester, setSemester] = useState("");
    const [year, setYear] = useState("");
    const [token, setToken] = useState("");

    function semesterHandler(event) {
        setSemester(event.target.value);
    }

    function yearHandler(event) {
        setYear(event.target.value);
    }

    function createSemester() {
        let data = JSON.stringify({
            "semester": semester,
            "year": year
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/attendance/api/semesters/',
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
    }, [token])

    return (
        <div>
            <p>Semester: <input onChange={semesterHandler} type={"text"}/></p>
            <p>Year: <input onChange={yearHandler} type={"text"}/></p>
            <button onClick={createSemester}><Link to={`/getallsemester/`}>Create semester</Link></button>
        </div>
    );
}

export default CreateOneSemester;