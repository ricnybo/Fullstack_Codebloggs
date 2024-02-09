import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Form, Button, Modal, Row, Col, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "./components.css/editUser.css";

const EditUser = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const userId = state.selUserId;
    const [updateUser, setUpdateUser] = useState(null); // State to hold user details
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [birthday, setBirthday] = useState(new Date());
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    useEffect(() => {
        // Fetch user details based on userId
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/user/${userId}`);
                setUpdateUser(response.data.data.user); // Set the user details in state
                setBirthday(new Date(response.data.data.user.birthday));
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [userId]); // Fetch user details when userId changes

    // Function to handle form submission (save action)
    const handleSubmit = async (event) => {
        event.preventDefault();
        // setShowModal(false);
        if (updateUser.password && confirmPassword && updateUser.password !== confirmPassword) {
            setPasswordsMatch(false);
            return; // Exit early if passwords do not match
        }
        if (updateUser.birthday !== birthday) updateUser.birthday = birthday;

        try {
            await axios.put(`/user/${userId}`, updateUser); // Update user details
            toast.success("User updated successfully.");
            navigate("/user-manager"); // Navigate back to user manager page
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user.");
        }
    };

    const handleSaveClick = (event) => {
        event.preventDefault();
        setShowModal(true);
    };

    // Function to handle modal close
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="edit-user-page">
            {updateUser && (
                <div style={{ height: "100vh" }}>
                    <h2 className="edit-user-header">Edit User</h2>
                    <div className="edit-user-container">
                        <Form onSubmit={handleSubmit}>
                            <Row className="justify-content-md-center g-6">
                                <Col xs={16} md={6}>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateUser.first_name}
                                            onChange={(e) =>
                                                setUpdateUser({
                                                    ...updateUser,
                                                    first_name: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateUser.last_name}
                                            onChange={(e) =>
                                                setUpdateUser({
                                                    ...updateUser,
                                                    last_name: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateUser.email}
                                            onChange={(e) =>
                                                setUpdateUser({ ...updateUser, email: e.target.value })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={updateUser.password}
                                            onChange={(e) =>
                                                setUpdateUser({
                                                    ...updateUser,
                                                    password: e.target.value,
                                                })
                                            }
                                            placeholder="********"
                                            required
                                        />
                                    </Form.Group>

                                    {updateUser.password && ( // Display the confirmation password field only when the password is not empty
                                        <Form.Group>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password" // Change type to "password" to hide the input characters
                                                value={confirmPassword}
                                                placeholder="Confirm Password"
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                    setPasswordsMatch(true);
                                                }}
                                                required
                                            />
                                            {!passwordsMatch && (
                                                <p className="error-text">Passwords do not match</p>
                                            )}
                                        </Form.Group>
                                    )}
                                </Col>

                                <Col xs={16} md={6} style={{ paddingLeft: "30px" }}>
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateUser.status}
                                            onChange={(e) =>
                                                setUpdateUser({ ...updateUser, status: e.target.value })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateUser.location}
                                            onChange={(e) =>
                                                setUpdateUser({
                                                    ...updateUser,
                                                    location: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Occupation</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={updateUser.occupation}
                                            onChange={(e) =>
                                                setUpdateUser({
                                                    ...updateUser,
                                                    occupation: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <span style={{ margin: "0 10px" }}></span>
                                        <DatePicker
                                            selected={birthday}
                                            onChange={setBirthday}
                                            dateFormat="MM/dd/yyyy"
                                            maxDate={new Date()}
                                            showYearDropdown
                                            showMonthDropdown
                                            dropdownMode="select"
                                            required
                                        />
                                    </Form.Group>

                                    {/* Add other form fields for last name, email, status, location, occupation, birthday */}
                                    <br />
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={handleSaveClick}
                                    >
                                        Save
                                    </Button>
                                    <span style={{ margin: "0 5px" }}></span>
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate("/user-manager")}
                                    >
                                        Back
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to update this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditUser;
