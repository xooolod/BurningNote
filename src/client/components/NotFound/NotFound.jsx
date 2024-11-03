import React from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { EmojiProvider, Emoji } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";

const NotFound = React.memo(() => {
    return (
        <EmojiProvider data={emojiData}>
            <Container fluid className="full-height text-light text-center align-center">
                <Emoji name="question-mark" className="pt-5" size={128}></Emoji>
                <h1 className="pt-5">404</h1>
                <h2 className="pt-2">This page was not found.</h2>
                <Button className="pt-2 text-center bg-dark" href="/">Homepage</Button>
            </Container>
        </EmojiProvider>
    );
});

export default NotFound;
