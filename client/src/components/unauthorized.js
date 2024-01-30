// Unauthorized.js page component
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Alert } from "react-bootstrap";
import "../Styles/Unauthorized.css"; // import the CSS file

// This component will display the unauthorized page.
function Unauthorized() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOk = () => {
        navigate("/login");
    };

    // This following section will display the unauthorized page.
    return (
        <Container
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <Alert variant="danger" className="text-center">
                <Alert.Heading>Unauthorized</Alert.Heading>
                <p>{location.state.message}</p>
                <Button variant="secondary" onClick={handleOk}>
                    OK
                </Button>
            </Alert>
        </Container>
    );
}

export default Unauthorized;
