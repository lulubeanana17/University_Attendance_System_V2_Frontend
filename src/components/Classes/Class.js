import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const GetAllClass = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                // Fetch all classes
                const classesResponse = await axios.get('http://127.0.0.1:8000/attendance/api/classes/', {
                    headers: {
                        Authorization: 'Token ' + token,
                    },
                });

                // Loop through each class to fetch related data
                const classesWithDetails = await Promise.all(
                    classesResponse.data.map(async (classInfo) => {
                        const courseResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/courses/${classInfo.course}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        const semesterResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/semesters/${courseResponse.data.semester}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        return {
                            id: classInfo.id,
                            number: classInfo.number,
                            semester: semesterResponse.data.semester,
                            year: semesterResponse.data.year,
                            courseCode: courseResponse.data.code,
                            courseName: courseResponse.data.name,
                        };
                    })
                );

                setClasses(classesWithDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <button><Link to={"/getallclass/createClass/"}>Create Class</Link></button>
            <h1>All Classes</h1>
            {classes.map((classItem) => (
                <div key={classItem.id}>
                    <Link to={`/getallclass/getoneclass/${classItem.id}/`}
                          key={classItem.id}>class: {classItem.number} - {classItem.courseCode} {classItem.courseName} - {classItem.semester} {classItem.year}</Link>
                </div>
            ))}
        </div>
    );
};

export default GetAllClass;
