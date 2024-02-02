// Admin.js

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Navbar from "./navbar";
import Sidebar from "./sideBar.js";
import { AuthContext } from "./AuthContext";
import useValidateSession from "./validateSession";
import "./components.css/sideBar.css";
import "./components.css/home.css";

function Admin() {
    const { validateSession } = useValidateSession();
    const navigate = useNavigate();
    const [users, setUsers] = useState(null); // Assuming you need user data in Admin page
    const [isLoading, setIsLoading] = useState(true); // Flag to handle loading state

    const {
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        validSession,
        setValidSession,
    } = useContext(AuthContext);

    useEffect(() => {
        const checkSession = async () => {
            const isValid = await validateSession();
            if (!isValid) {
                navigate("/login");
            } 
            if (user.auth_level !== "Admin" ) {
                navigate("/home");
            }
        };

        checkSession();
    }, []);

    return (
        <>
            {/* <Navbar />
            <Sidebar /> */}
            <Container fluid>
                <Row className="net-cont">
                    <Col md={4}>
                        <h3>Admin Page</h3>
                        <div>
                            <Card>
                                <Card.Body>
                                    <Card.Title>User Manager</Card.Title>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Content Manager</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col md={8}>
                        {/* Right side content (if any) */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Admin;


// import React from "react";
// import { Link } from "react-router-dom";
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from "./navbar";
// import Sidebar from "./sideBar.js";

// const Admin = () => {
//     return (
//       <div className="container mt-5">
//         <div className="row">
//           {/* Agent List Card */}
//           <div className="col-md-4 mb-4">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">User Manager</h5>
//                 <p className="card-text">A list of all our agents.</p>
//                 <Link to="/agent" className="btn btn-primary">
//                   Go to Agent List
//                 </Link>
//               </div>
//             </div>
//           </div>
  
//           {/* Transactions Card */}
//           <div className="col-md-4 mb-4">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">Content Manager</h5>
//                 <p className="card-text">View and manage transactions.</p>
//                 <Link to="/transactions" className="btn btn-primary">
//                   Go to Transactions
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default Admin;