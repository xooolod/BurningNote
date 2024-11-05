import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import * as Icon from 'react-bootstrap-icons';
import { EmojiProvider, Emoji } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";

import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = React.memo(() => {
    const [ totalCount, setTotalCount ] = useState("Loading...");

    useEffect(() => {
        /**
         * Sends a request to server to retrieve a total count of 
         * notes ever served
         */
        const getNotesCount = async () => {
            const response = await fetch("/api/getNotesCount/");

            if (!response || !response.ok) {
                setTotalCount("Error :(");
            } 

            const data = await response.json();
            setTotalCount(`${data.count}`);
        }

        getNotesCount();
    });

    return (
        <EmojiProvider data={emojiData}>
            <div className="header">
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container fluid className="h-100">
                    <Navbar.Brand href="/"><Emoji name={'fire'} height={24} /> Burning Notes</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="https://github.com/xooolod/BurningNote"><Icon.Github size={16} className="navbar-icon"/> Github</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Total notes ever served: {totalCount}
                        </Navbar.Text>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </EmojiProvider>
    );
});

export default Header;
