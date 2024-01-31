// Unauthorized.js page component
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Alert } from "react-bootstrap";
import "./components.css/unauthorized.css"; // import the CSS file

// This component will display the unauthorized page.
function Unauthorized() {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const handleOk = () => {
    navigate("/login");
  };

  // This following section will display the unauthorized page.
  return (
    <div className="unauthorized-page">
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Unauthorized</Alert.Heading>
          <p>{location.state.message.message}</p>
          <Button variant="secondary" onClick={handleOk}>
            OK
          </Button>
        </Alert>
      </Container>
    </div>
  );
}

export default Unauthorized;
