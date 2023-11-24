import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function GetOneLecturer() {
    const {lecturerId} = useParams();
    const [oneLecturer, setOneLecturer] = useState({});
    const [token, setToken] = useState("");

    const deleteLecturer = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/lecturers/${lecturerId}/`,
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

        const getLecturerData = async () => {
            try {
                const lecturerResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/lecturers/${lecturerId}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
                const lecturerData = lecturerResponse.data;

                const userResponse = await axios.get(`http://127.0.0.1:8000/attendance/api/users/${lecturerData.lecturerInfo}/`, {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });
                const userData = userResponse.data;

                const completeData = {
                    dob: lecturerData.dob,
                    lecturerInfo: lecturerData.lecturerInfo,
                    username: userData.username,
                    firstname: userData.first_name,
                    lastname: userData.last_name
                };
                setOneLecturer(completeData);

            } catch (error) {
                console.log(error);
            }
        };

        setToken(token);
        getLecturerData();
    }, []);

    return (
        <>
            <h3>Detail of the lecturer</h3>
            <p>Date of birth: {oneLecturer.dob}</p>
            <p>Username: {oneLecturer.username}</p>
            <p>Firstname: {oneLecturer.firstname}</p>
            <p>Lastname: {oneLecturer.lastname}</p>
            <button><Link to={`/getalllecturer/getonelecturer/updateonelecturer/${lecturerId}/${oneLecturer.lecturerInfo}`}>Update the
                lecturer</Link></button>
            <button onClick={deleteLecturer}><Link to={`/getalllecturer/`}>Delete the lecturer</Link></button>
        </>
    );
}

export default GetOneLecturer;