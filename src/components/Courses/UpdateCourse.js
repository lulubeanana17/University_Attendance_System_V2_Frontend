import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function UpdateOneCourse() {
    const {courseId} = useParams();
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [semesterId, setSemesterId] = useState(0);
    const [semesterDrop, setSemesterDrop] = useState([]);

    function semesterIdHandler(event) {
        setSemesterId(event.target.value);
    }

    function codeHandler(event) {
        setCode(event.target.value);
    }

    function nameHandler(event) {
        setName(event.target.value);
    }

    const updateCourse = () => {
        let data = JSON.stringify({
            "semester": Number(semesterId),
            "code": code,
            "name": name
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/courses/${courseId}/`,
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
                setSemesterDrop(response.data);
                setSemesterId(response.data[0].id);
            })
            .catch((error) => {
                console.log(error);
            });

        setToken(token);
    }, []);

    return (
        <>
            <h3>Update the course</h3>
            <select onChange={semesterIdHandler}>
                {semesterDrop.map((semester, index) =>
                <option key={index} value={semester.id}>{semester.semester} - {semester.year}</option>)}
            </select>
            <p>code: <input onChange={codeHandler} type={"text"}/></p>
            <p>name: <input onChange={nameHandler} type={"text"}/></p>
            <button onClick={updateCourse}><Link to={`/getallcourse/getonecourse/${courseId}`}>Update the course</Link></button>
        </>
    );
}

export default UpdateOneCourse;