import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function GetOneStudent() {
    const {studentId} = useParams();
    const [oneStudent, setOneStudent] = useState({});
    const [token, setToken] = useState("");

    const deleteStudent = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/students/${studentId}/`,
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

        const getStudentData = async () => {
            try {
                const studentResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/students/${studentId}/`, {
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
                setOneStudent(completeData);

            } catch (error) {
                console.log(error);
            }
        };

        setToken(token);
        getStudentData();
    }, []);

    return (
        <>
            <h3>Detail of the student</h3>
            <p>Date of birth: {oneStudent.dob}</p>
            <p>Username: {oneStudent.username}</p>
            <p>Firstname: {oneStudent.firstname}</p>
            <p>Lastname: {oneStudent.lastname}</p>
            <button><Link to={`/getallstudent/getonestudent/updateonestudent/${studentId}/${oneStudent.studentInfo}`}>Update the
                student</Link></button>
            <button onClick={deleteStudent}><Link to={`/getallstudent/`}>Delete the student</Link></button>
        </>
    );
}

export default GetOneStudent;