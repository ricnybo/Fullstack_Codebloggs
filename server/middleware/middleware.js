// middleware.js
// location: /server/middleware/middleware.js
// middleware checks if the user is authenticated or not
import Session from "../db/MongoDB/Schema/session.Schema.js";

// auth is used to authenticate the user
const auth = async (req, res, next) => {
  const session_id = req.cookies.session_id;
  if (!session_id) {
    return res.status(401).send("No session token provided");
  }
  try {
    // find the session with the provided session_token
    const session = await Session.findOne({ session_id });

    // if no session is found, return an error
    if (!session) {
      return res.status(401).send("Invalid session token");
    }

    // if a session is found, add the session to the request object and call next()
    req.session = session;
    console.log("auth success");
    next();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

export default auth;
