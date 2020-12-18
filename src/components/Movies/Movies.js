import React from "react";
import PropTypes from "prop-types";
import {Card, Col, Row} from "react-bootstrap";
import Movie from "../Movie/Movie";

function Movies({ movies, baseURL }) {
    if (!movies.length) {
        return <p>No data found!</p>;
    }

    const moviesCollectionComponent = movies.map(m => {
        return (
            <Col md={4} key={m.id}>
                <Movie movie={m} baseURL={baseURL} />
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