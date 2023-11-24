import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function CreateOneCourse(props) {
    const [semesterId, setSemesterId] = useState(0);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
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

    function createCourse() {
        let data = JSON.stringify({
            "semester": Number(semesterId),
            "code": code,
            "name": name
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/attendance/api/courses/',
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
    }, [])

    return (
        <div>
            <select onChange={semesterIdHandler}>
                {semesterDrop.map((semester, index) =>
                <option value={semester.id} key={index}>{semester.semester} - {semester.year}</option>)}
            </select>
            <p>code: <input onChange={codeHandler} type={"text"}/></p>
            <p>name: <input onChange={nameHandler} type={"text"}/></p>
            <button onClick={createCourse}><Link to={`/getallcourse/`}>Create course</Link></button>
        </div>
    );
}

export default CreateOneCourse;