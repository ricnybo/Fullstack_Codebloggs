// ValidateSession.js
// This component will validate the session by comparing the cookie
// and the session in the DB. It returns true if valid and false if not.
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { getCookie, setCookie } from "react-use-cookie";

// This hook will validate the session.
const useValidateSession = () => {
  const { setValidSession, setUser, setIsLoggedIn } = useContext(AuthContext);

  // Get cookie and send a GET request to the validate_token endpoint
  const validateSession = async () => {

    try {
      const response = await axios.get("/validate_token");
      if (!response.data.data.valid) {
        setValidSession(false);
        setUser({});
        setIsLoggedIn(false);
        setCookie("session_id", "", { expires: -1 });
        return false;
      }

      return true;
    } catch (err) {
      console.error("404 error: " + err);
      setValidSession(false);
      setUser({});
      setIsLoggedIn(false);
      setCookie("session_id", "", { expires: -1 });
      return false;
    }
  };

  return { validateSession };
};

export default useValidateSession;
