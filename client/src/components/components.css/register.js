// signup.js is a component that will display a form that will allow the
// user to sign up for access to the application.
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
// import "../Styles/Signup.css"; // import the CSS file

// This component will display the signup form.
const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [location, setLocation] = useState("");
    const [occupation, setOccupation] = useState("");
    const [authLevel, setAuthLevel] = useState("");
    const navigate = useNavigate();

    // This function will handle the submission.
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/user/register", {
                first_name: firstName,
                last_name: lastName,
                birthday: birthday,
                email,
                password,
                status,
                location,
                occupation,
                auth_level: "Basic",
            });
            toast.success("User created successfully.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            // Handle the response from the server
            navigate("/user/login"); // navigate to the login page
        } catch (error) {
            toast.error("User creation failed: " + error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            console.error(error);
            if (error.response && error.response.status === 403) {
                navigate("/unauthorized", {
                    state: { message: error.response.data },
                });
            }
        }
    };

    // This following section will display the form that takes the input from the user.
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <br />
                    <h3 className="text-center">Sign Up</h3>
                    <br />
                    <div className="signup-form">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
