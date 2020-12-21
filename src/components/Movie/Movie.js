import React from "react";
import PropTypes from "prop-types";
import {Badge, Button, Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function Movie({ movie, baseURL, detailedCard = false }) {
    const { title, backdrop_path } = movie;
    const imageSrc = `${baseURL}${backdrop_path}`;

    const history = useHistory();

    const styles = {
        card: {
            cursor: 'pointer',
        },
        image: {
            width: 'auto',
            objectFit: 'cover',
        },
        body: {

        },
    }

    if (detailedCard === true) {
        if (!title) {
            return <p>Please wait...</p>
        }

        return (
            <React.Fragment>
                <img style={{
                    ...styles.image,
                    width: 400,
                }}
                    src={imageSrc}
                    alt={title}
                />
                <h2>{title}</h2>

                <p className={"text-muted"}>
                    <Badge pill variant={"secondary"}>Release Date: {movie['release_date']}</Badge>
                </p>

                <p>{movie['overview']}</p>

                <p>
                    <Button
                        variant={"secondary"}
                        onClick={() => history.goBack()}
                    ><i className="fas fa-arrow-left" /> Back</Button>
                </p>
            </React.Fragment>
        );
    }

    return (
        <Card  onClick={() => history.push(`/movie/${movie.id}`)} className="m-2" style={styles.card} >
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