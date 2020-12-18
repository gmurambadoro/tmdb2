import React from "react";
import PropTypes from "prop-types";
import {Card} from "react-bootstrap";

function Movie({ movie, baseURL }) {
    const { title, backdrop_path } = movie;
    const imageSrc = `${baseURL}${backdrop_path}`;

    const styles = {
        card: {
            minHeight: '350px',
            cursor: 'pointer',
        },
        image: {
            height: '70%',
            minHeight: '300px',
            width: 'auto',
            objectFit: 'cover',
        },
        body: {

        },
    }

    return (
        <Card className="m-2" style={styles.card}>
            <Card.Img src={imageSrc} alt="Backdrop" style={styles.image} />
            <Card.Body style={styles.body}>
                <p>
                    <strong>{title}</strong> <br />

                    <span>
                        <i className="fas fa-calendar-alt" /> {movie['release_date']}
                    </span>
                </p>
            </Card.Body>
        </Card>
    );
}

Movie.propTypes = {
    movie: PropTypes.object.isRequired,
    baseURL: PropTypes.string.isRequired,
};

export default Movie;