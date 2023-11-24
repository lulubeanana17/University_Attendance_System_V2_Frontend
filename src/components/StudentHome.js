import Nav from "react-bootstrap/Nav";

function StudentHome() {
    return (
        <>
            <button><Nav.Link href="/viewattendance/">View attendance</Nav.Link></button>
        </>
    );
}

export default StudentHome;