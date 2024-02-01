import React from 'react';
// import Header from './Header';
import Navbar from './navbar';
// import Navigation from './Navigation';
import Sidebar from './sideBar';
import styled from 'styled-components';
// import { Navbar } from 'react-bootstrap';
// component styles
const Wrapper = styled.div`
    @media (min-width: 700px) {
        display: flex;
        top: 64px;
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
    padding: 1em;
    overflow-y: scroll;
    @media (min-width: 700px) {
        flex: 1;
        margin-left: 260px;
        height: calc(100% - 64px);
        width: calc(100% - 260px);
    }
`;
const Layout = ({ children }) => {
    return (
        <React.Fragment>
            {/* <Navbar /> */}
            <Wrapper>
                <Sidebar />
                <Main>{children}</Main>
            </Wrapper>
        </React.Fragment>
    );
};
export default Layout;