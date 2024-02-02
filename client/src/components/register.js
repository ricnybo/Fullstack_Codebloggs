// register.js is a component that will display a form that will allow the
// user to sign up for access to the application.
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
// import "bootstrap/dist/css/bootstrap.css";
import "./components.css/register.css"; // import the CSS file

// This component will display the signup form.
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [authLevel, setAuthLevel] = useState("Basic");
  const navigate = useNavigate();

  // This function will handle the submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/user/register", {
        first_name: firstName,
        last_name: lastName,
        birthday: birthday,
        email,
        password,
        status,
        location,
        occupation,
        auth_level: authLevel,
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
      navigate("/login"); // navigate to the login page
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
    <div className="register-page">
      <div className="register-container">
        <div className="register-form">
          <Row className="justify-content-md-center">
            <Col xs={12} className="text-center">
              <img
                alt="CodeBloggs logo"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                }}
                src="./img/CodeBloggslogo.png"
              ></img>
              <h1 className="text-center">Register</h1>
            </Col>
          </Row>
          <Row className="justify-content-md-center g-6">
            <Col xs={12} md={11}>
              <Form onSubmit={handleSubmit}>
                <Row className="justify-content-md-center g-6">
                  <Col md={6} style={{ paddingRight: "30px" }}>
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
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                  </Col>

                  <Col md={6} style={{ paddingLeft: "30px" }}>
                    <Form.Group className="mb-3" controlId="formBasicStatus">
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        type="status"
                        placeholder="Enter status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLocation">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="location"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicOccupation"
                    >
                      <Form.Label>Occupation</Form.Label>
                      <Form.Control
                        type="occupation"
                        placeholder="Enter occupation"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <br />
                    <Form.Group className="mb-3" controlId="formBasicBirthday">
                      <Form.Label className="mr-3">Birthday</Form.Label>
                      <DatePicker
                        selected={birthday}
                        onChange={(date) => setBirthday(date)}
                        dateFormat="MM/dd/yyyy"
                        maxDate={new Date()}
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Register;
