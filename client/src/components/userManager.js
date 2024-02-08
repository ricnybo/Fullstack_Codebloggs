import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
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
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');

    const {
        isLoggedIn,
        user,
    } = useContext(AuthContext);

     useEffect(() => {
        const checkSession = async () => {
            const isValid = await validateSession();
            if (!isValid) {
                navigate("/login");
            }
            if (user.auth_level !== "Admin") {
                navigate("/home");
            }
        };

        checkSession();
    }, []);

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

    const handleSort = (field) => {
        if (field === sortField) {
            // If already sorting by the same field, toggle direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // If sorting by a different field, set it to the new field
            setSortField(field);
            setSortDirection('asc'); // Default direction when changing field
        }
        setUsers(sortedUsers);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const sortedUsers = [...users].sort((a, b) => {
        const nameA = sortField === 'first_name' ? a.first_name : a.last_name;
        const nameB = sortField === 'first_name' ? b.first_name : b.last_name;

        if (sortDirection === 'asc') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });
    

    const handleEditUser = (userId) => {
        // Navigate to the edit user page with the userId as a parameter
        // navigate(`/edit-user/${userId}`);
        navigate(`/edit-user/`,{state:{selUserId: userId}});
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/user/${userId}`);
            // After successful deletion, fetch users again to update the list
            const response = await axios.get("/user");
            setUsers(response.data.data.user_list);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

   
    return (
        
        <div className="user-man">
            <h2 className="user-header">User Manager</h2>
            <div className="sort-buttons">
                <Button variant="primary" onClick={() => handleSort('first_name')}>Sort by First Name</Button>
                <span style={{ margin: '0 10px' }}></span>
                <Button variant="primary" onClick={() => handleSort('last_name')}>Sort by Last Name</Button>
                <Form.Control
                    type="text"
                    style={{width: "20em"}}
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            
            <ul className="user-list">
                {filteredUsers.map((selUser) => (
                    <li className="user-item" key={selUser.user_id}>
                        <span>{selUser.first_name} {selUser.last_name}</span>
                        <div className="user-button">
                            <Button variant="primary" onClick={() => handleEditUser(selUser.user_id)}>Edit</Button>
                            <Button variant="secondary" onClick={() => handleDeleteUser(selUser.user_id)}>Delete</Button>
                        </div>
                    </li>
                ))}
            </ul>
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