import {useEffect, useState} from "react";
import axios from "axios";

const ViewAttendance = () => {
    const [attendances, setAttendances] = useState([]);
    const [attendanceFilteredData, setAttendanceFilteredData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const getEnrollmentIdByToken = () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/attendance/get_enrollment_id/',
                headers: {
                    'Authorization': 'Token ' + token
                }
            };

            axios.request(config)
                .then((response) => {
                    getAttendanceFilteredData(response.data.enrollment_id);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        const getAttendanceFilteredData = (props) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://127.0.0.1:8000/attendance/api/attendances/',
                headers: {
                    'Authorization': 'Token ' + token
                }
            };

            axios.request(config)
                .then((response) => {
                    const filteredData = response.data.filter(item => item.enrollment === props);
                    getAttendancesByStudent(filteredData);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        const getAttendancesByStudent = async (props) => {
            try {
                const getAttendancesDetails = await Promise.all(
                    props.map(async (attendance) => {
                        const classResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/classes/${attendance.class_info}/`,
                            {
                                headers: {
                                    Authorization: 'Token ' + token,
                                },
                            }
                        );

                        const courseResponse = await axios.get(
                            `http://127.0.0.1:8000/attendance/api/courses/${classResponse.data.course}/`,
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
                            id: attendance.id,
                            classNumber: classResponse.data.number,
                            courseCode: courseResponse.data.code,
                            courseName: courseResponse.data.name,
                            semesterName: semesterResponse.data.semester,
                            semesterYear: semesterResponse.data.year,
                            status: attendance.status,
                            date: attendance.date
                        }
                    })
                )
                setAttendances(getAttendancesDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getEnrollmentIdByToken();
    }, [])

    return (
        <div>
            <table style={{borderCollapse: "collapse", width: "100%"}}>
                <thead>
                <tr>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Class Name</th>
                </tr>
                </thead>
                <tbody>
                {attendances.map((attendance, index) => {
                    const className = `${attendance.classNumber} - ${attendance.courseCode} ${attendance.courseName} - ${attendance.semesterName} ${attendance.semesterYear}`;

                    return (
                        <tr key={index}>
                            <td>{attendance.status}</td>
                            <td>{attendance.date}</td>
                            <td>{className}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

        </div>
    )
}

export default ViewAttendance;
