// import React from 'react';
import React, { useState, useEffect, useContext } from "react";
import Navbar from './navbar';
import Sidebar from './sideBar';
import {
    AuthContext,
    AuthProvider,
    UserContext,
} from "./AuthContext";
import styled from 'styled-components';
// component styles
const Wrapper = styled.div`
    @media (min-width: 700px) {
        display: flex;
        top: 80px;
        position: relative;
        height: calc(100% - 64px);
        width: 100%;
        flex: auto;
        flex-direction: column;
    }
`;
const Main = styled.main`
    position: fixed;
    height: calc(100% - 185px);
    width: 100%;
    padding-top: 0px;
    padding: none;
    overflow-y: scroll;
    @media (min-width: 700px) {
        flex: 1;
        margin-left: 150px;
        height: calc(100% - 80px);
        width: calc(100% - 150px);
    }
`;
  
const Layout = ({ children }) => {
    const {
        isLoggedIn,
    } = useContext(AuthContext);

    return (
        <React.Fragment>
            <Navbar />
            <Wrapper>
                {isLoggedIn ? <Sidebar /> : null}
                <Main>{children}</Main>
            </Wrapper>
        </React.Fragment>
    );
};
export default Layout;