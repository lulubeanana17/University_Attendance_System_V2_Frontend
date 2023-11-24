import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function CreateOneEnrollment(props) {
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState(0);
    const [users, setUsers] = useState([]);

    function userIdHandler(event) {
        setUserId(Number(event.target.value));
    }

    function createEnrollment() {
        let data = JSON.stringify({
            "student": userId
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/attendance/api/enrollments/',
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

        const getUsers = async () => {
            try {
                const studentsResponse = await axios.get('http://127.0.0.1:8000/attendance/api/students/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const getUserDetails = await Promise.all(
                    studentsResponse.data.map(async (student) => {
                        const usersResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/users/${student.studentInfo}/`, {
                            headers: {
                                Authorization: 'Token ' + token,
                            },
                        });

                        return {
                            id: student.id,
                            dob: student.dob,
                            firstname: usersResponse.data.first_name,
                            lastname: usersResponse.data.last_name
                        }
                    })
                )
                setUsers(getUserDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        setToken(token);
        getUsers();
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{display: "flex"}}>
                <h6>Students:</h6>
                <select value={userId} onChange={userIdHandler}>
                    <option value={0} disabled>Select a user...</option>
                    {users.map((user, index) =>
                        <option
                            value={user.id} key={index}>{user.firstname} {user.lastname} ({user.dob})</option>)}
                </select>
            </div>
            <button onClick={createEnrollment}><Link to={`/getallenrollment/`}>Create enrollment</Link></button>
        </div>
    );
}

export default CreateOneEnrollment;