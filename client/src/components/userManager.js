import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import useValidateSession from "./validateSession";
import "./components.css/userManager.css";
import "./components.css/sideBar.css";


function UserManager() {
    const { validateSession } = useValidateSession();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const {
        isLoggedIn,
        user,
    } = useContext(AuthContext);
    useEffect(() => {
        // Fetch users from the backend
        const fetchUsers = async () => {
          try {
            const response = await axios.get("/user");
            setUsers(response.data.data.user_list);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };

        fetchUsers();
    }, []);

    const handleEditUser = (userId) => {
        // Navigate to the edit user page with the userId as a parameter
        navigate(`/edit-user/${userId}`);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/user/${userId}`);
            // After successful deletion, fetch users again to update the list
            const response = await axios.get("http://localhost:5000/user");
            setUsers(response.data);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        
        <div className="user-man">
        {/* <Container> */}
            <h2 className="user-header">User Manager</h2>
            <ul className="user-list">
                {users.map((user) => (
                    <li className="user-item" key={user._id}>
                        <span>{user.first_name} {user.last_name}</span>
                        <div className="user-button">
                            <Button variant="primary" onClick={() => handleEditUser(user._id)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                        </div>
                    </li>
                ))}
            </ul>
        {/* </Container> */}
        </div>
    );
}

export default UserManager;

// //userM.js
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import axios from "axios";
// import Navbar from "./navbar";
// import Sidebar from "./sideBar.js";
// import { AuthContext } from "./AuthContext";
// import useValidateSession from "./validateSession";
// import "./components.css/userM.css";

// function UserManager() {
//     const { validateSession } = useValidateSession();
//     const navigate = useNavigate();
//     const [users, setUsers] = useState([]); 
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedUser, setSelectedUser] = useState([]);

//     const {
//         isLoggedIn,
//         setIsLoggedIn,
//         user,
//         setUser,
//         validSession,
//         setValidSession,
//     } = useContext(AuthContext);

//     useEffect(() => {
//         const checkSession = async () => {
//             const isValid = await validateSession();
//             if (!isValid) {
//                 navigate("/login");
//             } 
//             if (user.auth_level !== "Admin" ) {
//                 navigate("/home");
//             }
//         };

//         checkSession();
//     }, []);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/user_id");
//             setUsers(response.data);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };

//     return (
       
//         <div>
//             <h3 className="user-li">User List</h3>
//             <ul>
//                 {users.map((user) => (
//                     <li key={user._id}>
//                         {user.first_name} {user.last_name}
//                     </li>
//                 ))}
//             </ul>
//         </div>
    
//     );

// }


// export default UserManager;