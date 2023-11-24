import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function GetOneCourse() {
    const {courseId} = useParams();
    const [oneCourse, setOneCourse] = useState({});
    const [token, setToken] = useState("");

    const deleteCourse = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/courses/${courseId}/`,
            headers: {
                'Authorization': 'Token ' + token
            }
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

        const getCourseDetail = async () => {
            const courseResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/courses/${courseId}/`, {
                headers: {
                    Authorization: 'Token ' + token,
                },
            });

            const semesterResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/semesters/${courseResponse.data.semester}/`, {
                headers: {
                    Authorization: 'Token ' + token,
                },
            });

            const courseDetail = {
                id: courseResponse.data.id,
                semester: semesterResponse.data.semester,
                year: semesterResponse.data.year,
                code: courseResponse.data.code,
                name: courseResponse.data.name
            }

            setOneCourse(courseDetail);
        }

        getCourseDetail();
        setToken(token);
    }, []);

    return (
        <>
            <h3>Detail of the course</h3>
            <p>semester: {oneCourse.semester} - {oneCourse.year}</p>
            <p>code: {oneCourse.code}</p>
            <p>name: {oneCourse.name}</p>
            <button><Link to={`/getallcourse/getonecourse/updateonecourse/${oneCourse.id}/`}>Update the
                semester</Link></button>
            <button onClick={deleteCourse}><Link to={`/getallcourse/`}>Delete the course</Link></button>
        </>
    );
}

export default GetOneCourse;