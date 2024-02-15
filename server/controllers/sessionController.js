// sessionController.js
// location: /server/controllers/sessionController.js
// This file will contain the logic for creating and validating sessions.
import Session from "../db/MongoDB/Schema/session.Schema.js";
import { v4 as uuid } from "uuid";

// This section will help you create a new session.
const createSession = async (req, res) => {
  try {
    const { user_id } = req.params;
    const session_id = uuid(); // generate a new session token

    const newSession = new Session({
      session_id,
      session_date: Date.now(),
      user: user_id,
    });
    await newSession.save();
    console.log("Session saved");

    res.cookie("session_id", session_id, { maxAge: 24 * 60 * 60 * 1000 });
    console.log("Cookie posted");

    res.status(200).json({
      status: "ok",
      data: { valid: true, newSession },
      message: "Session saved successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating session.");
  }
};

// This section will help you validate a session.
const validateToken = async (req, res) => {
  try {
    const tokenCookie = req.cookies.session_id;
    const session = await Session.findOne({ session_id: tokenCookie }).populate(
      "user"
    );

    if (!session) {
      console.log("No session found");
      return res.status(404).json({
        status: "ok",
        data: { valid: false },
        message: "No valid session exists",
      });
    }

    console.log("Valid Session found");
    res.status(200).json({
      status: "ok",
      data: {
        valid: true,
        user: {
          id: session.user._id,
        },
      },
      message: "Valid session",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error validating token.");
  }
};

export { createSession, validateToken };
