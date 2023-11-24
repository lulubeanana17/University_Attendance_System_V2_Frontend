import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {Form} from 'react-bootstrap';
import course from "../Courses/Course";

function CreateOneClass(props) {
    const [number, setNumber] = useState("");
    const [token, setToken] = useState("");
    const [courseId, setCourseId] = useState(0);
    const [courses, setCourses] = useState([]);
    const [enrollmentId, setEnrollmentId] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [lecturerId, setLecturerId] = useState(0);
    const [lecturers, setLecturers] = useState([]);

    function courseIdHandler(event) {
        setCourseId(Number(event.target.value));
    }

    function numberHandler(event) {
        setNumber(event.target.value);
    }

    const handleSelectHandler = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setEnrollmentId(selectedValues);
    };

    function lecturerIdHandler(event) {
        setLecturerId(Number(event.target.value));
    }

    function createClass() {
        let data = JSON.stringify({
            "number": number,
            "course": courseId,
            "enrollments": enrollmentId,
            "lecturer": lecturerId
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/attendance/api/classes/',
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

        const getCourses = async () => {
            try {
                const coursesResponse = await axios.get('http://127.0.0.1:8000/attendance/api/courses/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const getCourseDetails = await Promise.all(
                    coursesResponse.data.map(async (course) => {
                        const semesterResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/semesters/${course.semester}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        return {
                            id: course.id,
                            code: course.code,
                            name: course.name,
                            semester: semesterResponse.data.semester,
                            year: semesterResponse.data.year
                        }
                    })
                )
                setCourses(getCourseDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const getEnrollments = async () => {
            try {
                const enrollmentsResponse = await axios.get('http://127.0.0.1:8000/attendance/api/enrollments/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const getEnrollmentsDetails = await Promise.all(
                    enrollmentsResponse.data.map(async (enrollment) => {
                        const studentResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/students/${enrollment.student}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        const userResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/users/${studentResponse.data.studentInfo}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        return {
                            id: enrollment.id,
                            firstName: userResponse.data.first_name,
                            lastName: userResponse.data.last_name
                        }
                    })
                )
                setEnrollments(getEnrollmentsDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        const getLecturers = async () => {
            try {
                const lecturersResponse = await axios.get('http://127.0.0.1:8000/attendance/api/lecturers/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const getLecturerDetails = await Promise.all(
                    lecturersResponse.data.map(async(lecturer) => {
                        const userResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/users/${lecturer.lecturerInfo}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        return {
                            id: lecturer.id,
                            firstName: userResponse.data.first_name,
                            lastName: userResponse.data.last_name
                        }
                    })
                )
                setLecturers(getLecturerDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        setToken(token);
        getCourses();
        getEnrollments();
        getLecturers();
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{display: "flex"}}>
                <h6>Course:</h6>
                <select value={courseId} onChange={courseIdHandler}>
                    <option value={0} disabled>Select a course...</option>
                    {courses.map(course =>
                        <option
                            value={course.id}>{course.code} {course.name} - {course.semester} {course.year}</option>)}
                </select>
            </div>
            <p>number: <input onChange={numberHandler} type={"text"}/></p>
            <div style={{display: "flex"}}>
                <h6>Enrollment:</h6>
            <Form.Select
                multiple
                onChange={handleSelectHandler}
            >
                {enrollments.map(enrollment => (
                    <option value={enrollment.id}>{enrollment.firstName} {enrollment.lastName}</option>
                ))}
            </Form.Select>
            </div>
            <div style={{display: "flex"}}>
                <h6>Lecturer:</h6>
                <select value={lecturerId} onChange={lecturerIdHandler}>
                    <option value={0} disabled>Select a lecturer...</option>
                    {lecturers.map(lecturer =>
                        <option
                            value={lecturer.id}>{lecturer.firstName} {lecturer.lastName}</option>)}
                </select>
            </div>
            <button onClick={createClass}><Link to={`/getallclass/`}>Create class</Link></button>
        </div>
    );
}

export default CreateOneClass;