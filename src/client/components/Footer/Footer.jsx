import React from 'react';
import { Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = React.memo(() => {
    return (
        <footer className="bg-dark text-light py-4">
        <Container>
            <Col className="text-center">
                <p className="mb-0">&copy; {new Date().getFullYear()} BurningNote. All rights reserved.</p>
            </Col>
        </Container>
        </footer>
    );
});

export default Footer;
