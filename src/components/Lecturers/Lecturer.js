import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const GetAllLecturer = () => {
    const [lecturers, setLecturers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getLecturerDetail = async () => {
            try {
                const lecturersResponse = await axios.get('http://127.0.0.1:8000/attendance/api/lecturers/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const lecturerDetails = await Promise.all(
                    lecturersResponse.data.map(async (lecturer) => {
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
                            dob: lecturer.dob,
                            username: userResponse.data.username,
                            firstname: userResponse.data.first_name,
                            lastname: userResponse.data.last_name
                        };
                    })
                );

                setLecturers(lecturerDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getLecturerDetail();
    }, []);

    return (
        <div>
            <button><Link to={"/getalllecturer/createLecturer/"}>Create Lecturer</Link></button>
            <h1>All Lecturers</h1>
            {lecturers.map((lecturerItem) => (
                <div key={lecturerItem.id}>
                    <Link to={`/getalllecturer/getonelecturer/${lecturerItem.id}/`}
                          key={lecturerItem.id}>Name: {lecturerItem.firstname} {lecturerItem.lastname} ({lecturerItem.dob})</Link>
                </div>
            ))}
        </div>
    );
};

export default GetAllLecturer;
