import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useEffect, useState} from "react";

function CustomisedNavBar() {
    const [hasToken, setHasToken] = useState(false);
    const [userType, setUserType] = useState("");

    useEffect(() => {
        localStorage.getItem("token") ? setHasToken(true) : setHasToken(false)
        setUserType(localStorage.getItem("userType"));
    }, [hasToken])

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Attendance System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {userType === "admin" ?
                            <Nav.Link href="/adminhome/">Home</Nav.Link>
                            :
                            userType === "lecturer" ?
                                <Nav.Link href="/lecturerhome/">Home</Nav.Link>
                                :
                                userType === "student" ?
                                    <Nav.Link href="/studenthome/">Home</Nav.Link>
                                    :
                                    <Nav.Link href="/">Home</Nav.Link>
                        }
                        {hasToken ?
                            <Nav.Link href="/logout/">Logout</Nav.Link>
                            :
                            <Nav.Link href="/login/">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomisedNavBar;