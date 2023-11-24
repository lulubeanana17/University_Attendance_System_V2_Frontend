import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function GetOneClass() {
    const {classId} = useParams();
    const [oneClass, setOneClass] = useState({});
    const [token, setToken] = useState("");
    const [enrollment, setEnrollment] = useState([]);

    const deleteClass = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/classes/${classId}/`,
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

        const getEnrollmentsData = async () => {
            const classResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/classes/${classId}/`, {
                headers: {
                    Authorization: 'Token ' + token,
                },
            });

            const enrollmentsData = classResponse.data.enrollments;

            const studentPromises = enrollmentsData.map(enrollmentId => {
                return axios.get(`http://127.0.0.1:8000/attendance/api/enrollments/${enrollmentId}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
            });

            const enrollmentDetails = await Promise.all(studentPromises);

            const studentInfo = enrollmentDetails.map(enrollment => {
                const studentId = enrollment.data.student;
                return axios.get(`http://127.0.0.1:8000/attendance/api/students/${studentId}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
            });

            const studentUserDetails = await Promise.all(studentInfo);

            const studentNames = studentUserDetails.map(student => {
                const userId = student.data.studentInfo;
                return axios.get(`http://127.0.0.1:8000/attendance/api/users/${userId}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
            });

            const studentFullNames = await Promise.all(studentNames);

            const allEnrollmentNames = studentFullNames.map(student => {
                const {first_name, last_name} = student.data;
                return {firstName: first_name, lastName: last_name};
            });

            setEnrollment(allEnrollmentNames);
        }

        const getClassData = async () => {
            try {
                const classResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/classes/${classId}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
                const classData = classResponse.data;

                const courseResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/courses/${classData.course}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
                const courseData = courseResponse.data;

                const semesterResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/semesters/${courseData.semester}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
                const semesterData = semesterResponse.data;

                const lecturerResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/lecturers/${classData.lecturer}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
                const lecturerId = lecturerResponse.data.lecturerInfo;

                const lecturerUserResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/users/${lecturerId}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
                const lecturerUserData = lecturerUserResponse.data;

                const completeData = {
                    number: classData.number,
                    courseCode: courseData.code,
                    courseName: courseData.name,
                    semesterSemester: semesterData.semester,
                    semesterYear: semesterData.year,
                    lecturerFirstName: lecturerUserData.first_name,
                    lecturerLastName: lecturerUserData.last_name
                };
                setOneClass(completeData);

            } catch (error) {
                console.log(error);
            }
        };

        setToken(token);
        getClassData();
        getEnrollmentsData();
    }, []);

    return (
        <>
            <h3>Detail of the class</h3>
            <p>class number: {oneClass.number}</p>
            <p>course: {oneClass.courseCode} {oneClass.courseName}</p>
            <p>semester: {oneClass.semesterSemester} {oneClass.semesterYear}</p>
            <h6>Enrollments</h6>
            {enrollment.map((enrol, index) => (
                <p key={index}>{enrol.firstName} {enrol.lastName}</p>
            ))}
            <p>lecturer: {oneClass.lecturerFirstName} {oneClass.lecturerLastName}</p>
            <button><Link to={`/getallclass/getoneclass/updateoneclass/updateonelecturer/${classId}/`}>Update the
                lecturer</Link></button>
            <button><Link to={`/getallclass/getoneclass/updateoneclass/updateoneenrollments/${classId}/`}>Update the
                enrollments</Link></button>
            <button><Link to={`/getallclass/getoneclass/updateoneclass/${classId}/`}>Update the
                class</Link></button>
            <button onClick={deleteClass}><Link to={`/getallclass/`}>Delete the class</Link></button>
        </>
    );
}

export default GetOneClass;