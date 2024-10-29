import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import * as Icon from 'react-bootstrap-icons';
import { EmojiProvider, Emoji } from "react-apple-emojis"
import emojiData from "react-apple-emojis/src/data.json"

import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <EmojiProvider data={emojiData}>
            <div className="header">
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container fluid className="h-100">
                    <Navbar.Brand href="/"><Emoji name={'fire'} height={24} /> Burning Notes</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="https://github.com/xooolod/BurningNote"><Icon.Github size={16} className="navbar-icon"/> Github</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
            </div>
        </EmojiProvider>
    );
};

export default Header;
