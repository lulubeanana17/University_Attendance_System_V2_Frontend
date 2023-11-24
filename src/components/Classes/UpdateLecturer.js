import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function UpdateOneLecturer() {
    const {classId} = useParams();
    const [token, setToken] = useState("");
    const [lecturerId, setLecturerId] = useState(0);
    const [lecturers, setLecturers] = useState([]);

    function lecturerIdHandler(event) {
        setLecturerId(Number(event.target.value));
    }

    const updateLecturer = () => {
        let data = JSON.stringify({
            "lecturer": lecturerId
        });

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/classes/${classId}/`,
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

        const getLecturers = async () => {
            try {
                const lecturersResponse = await axios.get('http://127.0.0.1:8000/attendance/api/lecturers/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const getLecturerDetails = await Promise.all(
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
        getLecturers();
    }, []);

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h3>Update the lecturer</h3>
                <div style={{display: "flex"}}>
                    <h6>Lecturer:</h6>
                    <select value={lecturerId} onChange={lecturerIdHandler}>
                        <option value={0} disabled>Select a lecturer...</option>
                        {lecturers.map((lecturer, index) =>
                            <option
                                value={lecturer.id} key={index}>{lecturer.firstName} {lecturer.lastName}</option>)}
                    </select>
                </div>
                <button onClick={updateLecturer}><Link to={`/getallclass/getoneclass/${classId}`}>Update the
                    lecturer</Link></button>
            </div>
        </>
    );
}

export default UpdateOneLecturer;