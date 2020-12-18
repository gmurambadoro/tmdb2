import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import tmdb from "../../services/tmdb";

function TopRated({ configuration }) {
    // let's get the top rated movies
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        tmdb()
            .get('/movie/top_rated')
            .then(data => {
                console.log(data);
                setMovies(() => ({
                    ...data.data,
                }));
            });
    }, [configuration]);

    return <p>Top Rated</p>;
}

TopRated.propTypes = {
    configuration: PropTypes.object.isRequired,
};

export default TopRated;