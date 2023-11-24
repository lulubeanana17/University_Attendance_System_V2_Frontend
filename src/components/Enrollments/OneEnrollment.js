import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function GetOneEnrollment() {
    const {enrollmentId} = useParams();
    const [oneEnrollment, setOneEnrollment] = useState({});
    const [token, setToken] = useState("");

    const deleteEnrollment = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/enrollments/${enrollmentId}/`,
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

        const getEnrollmentData = async () => {
            try {
                const enrollmentResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/enrollments/${enrollmentId}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
                const enrollmentData = enrollmentResponse.data;

                const studentResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/students/${enrollmentData.student}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const studentData = studentResponse.data;

                const userResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/users/${studentData.studentInfo}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
                const userData = userResponse.data;

                const completeData = {
                    dob: studentData.dob,
                    studentInfo: studentData.studentInfo,
                    username: userData.username,
                    firstname: userData.first_name,
                    lastname: userData.last_name
                };
                setOneEnrollment(completeData);

            } catch (error) {
                console.log(error);
            }
        };

        setToken(token);
        getEnrollmentData();
    }, []);

    return (
        <>
            <h3>Detail of the enrollment</h3>
            <p>Date of birth: {oneEnrollment.dob}</p>
            <p>Username: {oneEnrollment.username}</p>
            <p>Firstname: {oneEnrollment.firstname}</p>
            <p>Lastname: {oneEnrollment.lastname}</p>
            <button onClick={deleteEnrollment}><Link to={`/getallenrollment/`}>Delete the enrollment</Link></button>
        </>
    );
}

export default GetOneEnrollment;