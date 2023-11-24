import Nav from "react-bootstrap/Nav";
import {useEffect, useState} from "react";

function AdminHome() {
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        localStorage.getItem("token") ? setHasToken(true) : setHasToken(false)
    }, [hasToken])

    return (
        <>
            {hasToken ?
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <button><Nav.Link href="/getallsemester/">View Semester</Nav.Link></button>
                    <button><Nav.Link href="/getallcourse/">View Course</Nav.Link></button>
                    <button><Nav.Link href="/getallclass/">View Class</Nav.Link></button>
                    <button><Nav.Link href="/createuser/">Create a User</Nav.Link></button>
                    <button><Nav.Link href="/getalllecturer/">View Lecturer</Nav.Link></button>
                    <button><Nav.Link href="/getallstudent/">View Student</Nav.Link></button>
                    <button><Nav.Link href="/getallenrollment/">View Enrollment</Nav.Link></button>
                    <button><Nav.Link href="/uploadExcel/">Upload Excel</Nav.Link></button>
                </div> :
                <div></div>
            }
        </>
    );
}

export default AdminHome;