import React from "react";
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import Movie from "../Movie/Movie";

function Movies({ movies, baseURL, ...props }) {
    if (!movies.length) {
        return <p>Please wait...</p>;
    }

    const moviesCollectionComponent = movies.map(m => {
        return (
            <Col md={4} key={m.id}>
                <Movie {...props} movie={m} baseURL={baseURL} />
            </Col>
        );
    });

    return (
        <Row>
            {moviesCollectionComponent}
        </Row>
    );
}

Movies.propTypes = {
    movies: PropTypes.array.isRequired,
    baseURL: PropTypes.string.isRequired,
}

export default Movies;