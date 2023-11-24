import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function GetAllSemester() {
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/attendance/api/semesters/',
            headers: {
                'Authorization': 'Token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                setSemesters(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>
            <button><Link to={"/getallsemester/createSemester/"}>Create Semester</Link></button>
            <br/>
            <label>Semester list</label>
            <div style={{display: "flex", flexDirection: "column"}}>
            {semesters.map(semesterItem =>
                <Link to={`/getallsemester/getonesemester/${semesterItem.id}/`} key={semesterItem.id}>{semesterItem.semester} - {semesterItem.year}</Link>)}
            </div>
        </>
    );
}

export default GetAllSemester;