import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function CreateOneLecturer(props) {
    const [DOB, setDOB] = useState("");
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState(0);
    const [users, setUsers] = useState([]);

    function dobHandler(event) {
        setDOB(event.target.value);
    }

    function userIdHandler(event) {
        setUserId(Number(event.target.value));
    }

    function createLecturer() {
        let data = JSON.stringify({
            "dob": DOB,
            "lecturerInfo": userId
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/attendance/api/lecturers/',
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
                const usersResponse = await axios.get('http://127.0.0.1:8000/attendance/api/users/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const getUserDetails = await Promise.all(
                    usersResponse.data.map(async (user) => {

                        return {
                            id: user.id,
                            firstName: user.first_name,
                            lastName: user.last_name
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
            <p>Date of Birth: <input onChange={dobHandler} type={"text"}/></p>
            <div style={{display: "flex"}}>
                <h6>User:</h6>
                <select value={userId} onChange={userIdHandler}>
                    <option value={0} disabled>Select a user...</option>
                    {users.map((user, index) =>
                        <option
                            value={user.id} key={index}>{user.firstName} {user.lastName}</option>)}
                </select>
            </div>
            <button onClick={createLecturer}><Link to={`/getalllecturer/`}>Create lecturer</Link></button>
        </div>
    );
}

export default CreateOneLecturer;