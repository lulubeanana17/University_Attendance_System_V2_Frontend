import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const GetAllStudent = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getStudentDetail = async () => {
            try {
                const studentsResponse = await axios.get('http://127.0.0.1:8000/attendance/api/students/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const studentDetails = await Promise.all(
                    studentsResponse.data.map(async (student) => {
                        const userResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/users/${student.studentInfo}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        return {
                            id: student.id,
                            dob: student.dob,
                            username: userResponse.data.username,
                            firstname: userResponse.data.first_name,
                            lastname: userResponse.data.last_name
                        };
                    })
                );

                setStudents(studentDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getStudentDetail();
    }, []);

    return (
        <div>
            <button><Link to={"/getallstudent/createStudent/"}>Create Student</Link></button>
            <h1>All Students</h1>
            {students.map((studentItem) => (
                <div key={studentItem.id}>
                    <Link to={`/getallstudent/getonestudent/${studentItem.id}/`}
                          key={studentItem.id}>Name: {studentItem.firstname} {studentItem.lastname} ({studentItem.dob})</Link>
                </div>
            ))}
        </div>
    );
};

export default GetAllStudent;
