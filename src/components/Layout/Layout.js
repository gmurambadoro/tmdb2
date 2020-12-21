import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Button, Container} from "react-bootstrap";
import {Route, Switch} from "react-router";
import TopRated from "../TopRated/TopRated";
import './Layout.css';

function Layout({ apiKey, handleApiKeyChanged, configuration}) {
    const changeApiKey = () => {
        const key = String(prompt('Enter your API key from TMDB: ') || '').trim().toString();

        if (!key) return;

        handleApiKeyChanged(key);
    };

    return (
        <BrowserRouter>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>TMDB</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Top Rated Movies</Nav.Link>
                    </Nav>

                    <Navbar.Text className="m-2">
                        {apiKey ? <><i className="fas fa-key" /> API KEY: {apiKey}</> : 'API Not Set'}
                    </Navbar.Text>

                    <Nav className="mr-1">
                        <Nav.Item>
                            <Button variant="btn btn-success" onClick={() => changeApiKey()}><i className="fas fa-wrench" /> Set API Key</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <main>
                <Container>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => <TopRated configuration={configuration || {}} />}
                        />
                    </Switch>
                </Container>
            </main>

            <footer>
                &copy; {(new Date()).getFullYear()}
            </footer>
        </BrowserRouter>
    );
}

Layout.propTypes = {
    apiKey: PropTypes.string.isRequired,
    handleApiKeyChanged: PropTypes.func.isRequired,
    configuration: PropTypes.object.isRequired,
}

export default Layout;