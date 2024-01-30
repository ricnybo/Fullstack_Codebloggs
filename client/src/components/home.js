// Home.js page component
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useValidateSession from "./ValidateSession";
import "../Styles/Home.css"; // import the CSS file

// This method allows the cards to be displayed horizontally.
function HorizontalScroll(props) {
    return <div className="horizontal-scroll-container">{props.children}</div>;
}

// This method will display the cards on the home page.
function HomeCards() {
    const { validateSession } = useValidateSession();
    const navigate = useNavigate();

    // This method will validate the session.
    useEffect(() => {
        const checkSession = async () => {
            const isValid = await validateSession();
            if (!isValid) {
                navigate("/admin/login");
            }
        };

        checkSession();
    }, []);

    const navigateToAgents = () => {
        navigate("/admin/agents");
    };
    const navigateToTransactions = () => {
        navigate("/admin/transactions");
    };
    const navigateToReport = () => {
        navigate("/admin/report");
    };

    // This section will display the cards.
    return (
        <div className="HomeCards">
            <HorizontalScroll>
                <Card>
                    <Card.Header>Administrative</Card.Header>
                    <Card.Body>
                        <Card.Title>Agent Management</Card.Title>
                        <Card.Text>
                            Used to make administrative changes to the list of agents.
                        </Card.Text>
                        <Button variant="primary" onClick={navigateToAgents}>
                            OK
                        </Button>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>Administrative</Card.Header>
                    <Card.Body>
                        <Card.Title>Transaction Management</Card.Title>
                        <Card.Text>
                            Used to make administrative changes to the list of transactions.
                        </Card.Text>
                        <Button variant="primary" onClick={navigateToTransactions}>
                            OK
                        </Button>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>Administrative</Card.Header>
                    <Card.Body>
                        <Card.Title>Transaction Report</Card.Title>
                        <Card.Text>
                            Used to see current report. This report updates when opened.
                        </Card.Text>
                        <Button variant="primary" onClick={navigateToReport}>
                            OK
                        </Button>
                    </Card.Body>
                </Card>
            </HorizontalScroll>
        </div>
    );
}

export default HomeCards;
