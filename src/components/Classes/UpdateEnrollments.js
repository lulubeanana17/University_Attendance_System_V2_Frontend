import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {Form} from "react-bootstrap";

function UpdateOneEnrollments() {
    const {classId} = useParams();
    const [token, setToken] = useState("");
    const [enrollmentId, setEnrollmentId] = useState([]);
    const [enrollments, setEnrollments] = useState([]);

    const handleSelectHandler = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setEnrollmentId(selectedValues);
    };

    const updateEnrollments = () => {
        let data = JSON.stringify({
            "enrollments": enrollmentId
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

        const getEnrollments = async () => {
            try {
                const enrollmentsResponse = await axios.get('http://127.0.0.1:8000/attendance/api/enrollments/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const getEnrollmentsDetails = await Promise.all(
                    enrollmentsResponse.data.map(async (enrollment) => {
                        const studentResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/students/${enrollment.student}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        const userResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/users/${studentResponse.data.studentInfo}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        return {
                            id: enrollment.id,
                            firstName: userResponse.data.first_name,
                            lastName: userResponse.data.last_name
                        }
                    })
                )
                setEnrollments(getEnrollmentsDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        setToken(token);
        getEnrollments();
    }, []);

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h3>Update the enrollments</h3>
                <div style={{display: "flex"}}>
                    <h6>Enrollment:</h6>
                    <Form.Select
                        multiple
                        onChange={handleSelectHandler}
                    >
                        {enrollments.map(enrollment => (
                            <option value={enrollment.id}>{enrollment.firstName} {enrollment.lastName}</option>
                        ))}
                    </Form.Select>
                </div>
                <button onClick={updateEnrollments}><Link to={`/getallclass/getoneclass/${classId}`}>Update the
                    enrollments</Link></button>
            </div>
        </>
    );
}

export default UpdateOneEnrollments;