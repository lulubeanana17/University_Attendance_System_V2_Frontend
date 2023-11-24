import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function GetOneSemester() {
    const {semesterId} = useParams();
    const [oneSemester, setOneSemester] = useState({});
    const [token, setToken] = useState("");

    const deleteSemester = () => {
        let data = '';

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/semesters/${semesterId}/`,
            headers: {
                'Authorization': 'Token ' + token
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://127.0.0.1:8000/attendance/api/semesters/${semesterId}/`,
            headers: {
                'Authorization': 'Token ' + token
            }
        };

        axios.request(config)
            .then((response) => {
                setOneSemester(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setToken(token);
    }, []);

    return (
        <>
            <h3>Detail of the semester</h3>
            <p>semester: {oneSemester.semester}</p>
            <p>year: {oneSemester.year}</p>
            <button><Link to={`/getallsemester/getonesemester/updateonesemester/${oneSemester.id}/`}>Update the
                semester</Link></button>
            <button onClick={deleteSemester}><Link to={`/getallsemester/`}>Delete the semester</Link></button>
        </>
    );
}

export default GetOneSemester;