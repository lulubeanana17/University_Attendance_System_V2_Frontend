import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function GetAllCourse() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/attendance/api/courses/',
            headers: {
                'Authorization': 'Token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>
            <button><Link to={"/getallcourse/createCourse/"}>Create Course</Link></button>
            <br/>
            <label>Course list</label>
            <div style={{display: "flex", flexDirection: "column"}}>
                {courses.map(courseItem =>
                    <Link to={`/getallcourse/getonecourse/${courseItem.id}/`}
                          key={courseItem.id}>{courseItem.code} - {courseItem.name}</Link>
                )}
            </div>
        </>
    );
}

export default GetAllCourse;