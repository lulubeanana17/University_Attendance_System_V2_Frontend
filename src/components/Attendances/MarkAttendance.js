import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const MarkAttendance = () => {
    const [token, setToken] = useState("");
    const [enrollmentId, setEnrollmentId] = useState(0);
    const [enrollments, setEnrollments] = useState([]);
    const [classId, setClassId] = useState(0);
    const [classes, setClasses] = useState([]);
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    function enrollmentIdHandler(event) {
        setEnrollmentId(Number(event.target.value));
    }

    function classIdHandler(event) {
        setClassId(Number(event.target.value));
    }

    function statusHandler(event) {
        setStatus(event.target.value);
    }

    function dateHandler(event) {
        setDate(event.target.value);
    }

    const handleAttendance = () => {
        let data = JSON.stringify({
            "class_info": classId,
            "enrollment": enrollmentId,
            "status": status,
            "date": date
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/attendance/api/attendances/',
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
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

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

        const getClasses = async () => {
            try {
                const classesResponse = await axios.get('http://127.0.0.1:8000/attendance/api/classes/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const classesWithDetails = await Promise.all(
                    classesResponse.data.map(async (classInfo) => {
                        const courseResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/courses/${classInfo.course}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        const semesterResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/semesters/${courseResponse.data.semester}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        return {
                            id: classInfo.id,
                            number: classInfo.number,
                            semester: semesterResponse.data.semester,
                            year: semesterResponse.data.year,
                            courseCode: courseResponse.data.code,
                            courseName: courseResponse.data.name,
                        };
                    })
                );

                setClasses(classesWithDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        setToken(token);
        getEnrollments();
        getClasses();
    }, [])

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2>Mark Attendance</h2>
            <label>Enrollment:</label>
            <div style={{display: "flex"}}>
                <select value={enrollmentId} onChange={enrollmentIdHandler}>
                    <option value={0} disabled>Select an enrollment...</option>
                    {enrollments.map((enrollment, index) =>
                        <option
                            value={enrollment.id} key={index}>{enrollment.firstName} {enrollment.lastName}</option>)}
                </select>
            </div>
            <label>Class::</label>
            <div style={{display: "flex"}}>
                <select value={classId} onChange={classIdHandler}>
                    <option value={0} disabled>Select a class...</option>
                    {classes.map((classItem, index) =>
                        <option
                            value={classItem.id}
                            key={index}>{classItem.number} - {classItem.courseCode} {classItem.courseName} - {classItem.semester} {classItem.year}</option>)}
                </select>
            </div>
            <label>Status:</label>
            <select value={status} onChange={statusHandler}>
                <option value="" disabled>Select a status...</option>
                <option value="attended">Attended</option>
                <option value="absent">Absent</option>
            </select>
            <label>Date:</label>
            <input type="date" value={date} onChange={dateHandler}/>
            <button onClick={handleAttendance}><Link to={`/lecturerhome/`}>Submit</Link></button>
        </div>
    );
};

export default MarkAttendance;
