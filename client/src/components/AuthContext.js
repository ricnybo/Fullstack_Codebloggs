// AuthContext.js
// This is the context that will be shared across all components.
// It will contain the user information and the logged in and session status.
import React, { createContext, useState, useEffect } from "react";

// Create the context object
export const AuthContext = createContext(null);
//export const UserContext = React.createContext();

// Create a provider for components to consume and subscribe to changes
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => JSON.parse(localStorage.getItem("isLoggedIn")) || false
    );
    const [user, setUser] = useState(
        () => JSON.parse(localStorage.getItem("user")) || null
    );
    const [validSession, setValidSession] = useState(
        () => JSON.parse(localStorage.getItem("validSession")) || false
    );

    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem("validSession", JSON.stringify(validSession));
    }, [validSession]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                validSession,
                setValidSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};