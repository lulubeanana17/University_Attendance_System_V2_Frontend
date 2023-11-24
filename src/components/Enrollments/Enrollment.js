import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const GetAllEnrollment = () => {
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getEnrollmentDetail = async () => {
            try {
                const enrollmentsResponse = await axios.get('http://127.0.0.1:8000/attendance/api/enrollments/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                const enrollmentDetails = await Promise.all(
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
                            dob: studentResponse.data.dob,
                            username: userResponse.data.username,
                            firstname: userResponse.data.first_name,
                            lastname: userResponse.data.last_name
                        };
                    })
                );

                setEnrollments(enrollmentDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getEnrollmentDetail();
    }, []);

    return (
        <div>
            <button><Link to={"/getallenrollment/createEnrollment/"}>Create Enrollment</Link></button>
            <h1>All Enrollments</h1>
            {enrollments.map((enrollmentItem) => (
                <div key={enrollmentItem.id}>
                    <Link to={`/getallenrollment/getoneenrollment/${enrollmentItem.id}/`}
                          key={enrollmentItem.id}>Name: {enrollmentItem.firstname} {enrollmentItem.lastname} ({enrollmentItem.dob})</Link>
                </div>
            ))}
        </div>
    );
};

export default GetAllEnrollment;
