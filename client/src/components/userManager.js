import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Pagination } from "react-bootstrap";
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
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10); // Define resultsPerPage
    const [totalPages, setTotalPages] = useState(1); // Define totalPages

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
                setTotalPages(Math.ceil(response.data.data.user_list.length / resultsPerPage));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [resultsPerPage]);

    const handleSort = (field) => {
        let direction = sortDirection;
        if (field === sortField) {
            // If already sorting by the same field, toggle direction
            direction = sortDirection === 'asc' ? 'desc' : 'asc';
            setSortDirection(direction);
        } else {
            // If sorting by a different field, set it to the new field
            setSortField(field);
            direction = 'asc'; // Default direction when changing field
            setSortDirection(direction);
        }

        // Sort the users here
        const sortedUsers = [...users].sort((a, b) => {
            const nameA = field === 'first_name' ? a.first_name : a.last_name;
            const nameB = field === 'first_name' ? b.first_name : b.last_name;

            if (direction === 'asc') {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

        setUsers(sortedUsers);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.first_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    

    const indexOfLastUser = currentPage * resultsPerPage;
    const indexOfFirstUser = indexOfLastUser - resultsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    useEffect(() => {
    }, [searchQuery, users]);


    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Navigate to the edit user page with the userId as a parameter
    const handleEditUser = (userId) => {
        navigate(`/edit-user/`, { state: { selUserId: userId } });
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/user/${userId}`);
            // After successful deletion, fetch users again to update the list
            const response = await axios.get("/user");
            setUsers(response.data.data.user_list);
            setTotalPages(Math.ceil(response.data.data.user_list.length / resultsPerPage));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (

        <div className="">

            <div className="user-sort-buttons">
                <label className="results-per-page">
                    Results per page:
                    <select className="user-spacer" value={resultsPerPage} onChange={(e) => setResultsPerPage(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </label>
                <div>
                    <div className="user-sortBy-ctr">Sort by:</div>
                    <div>
                        <Button variant="primary" onClick={() => handleSort('first_name')}>First Name</Button>
                        <Button className="user-spacer" variant="primary" onClick={() => handleSort('last_name')}>Last Name</Button>
                    </div>
                </div>
                <Form.Control
                    className="user-searchBox"
                    type="text"
                    // style={{ width: "20em" }}
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="user-man">
            <p className="user-header">User Manager</p>
            <ul className="user-list">
                {currentUsers.map((selUser) => (
                    <li className="user-item" key={selUser.user_id}>
                        <span className="fullname">{selUser.first_name} {selUser.last_name}</span>
                        <div className="user-button">
                            <Button variant="primary" onClick={() => handleEditUser(selUser.user_id)}>Edit</Button>
                            <span style={{ margin: '0 5px' }}></span>
                            <Button variant="secondary" onClick={() => handleDeleteUser(selUser.user_id)}>Delete</Button>
                        </div>
                    </li>
                ))}
            </ul>
            <Pagination>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        active={index + 1 === currentPage}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                </Pagination>
            </div>
        </div>
    );
}

export default UserManager;