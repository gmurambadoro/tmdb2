import React, {useEffect, useState} from "react";
import tmdb from "../../services/tmdb";
import Movie from "../Movie/Movie";

function MovieDetail({match, configuration, ...props}) {
    const [movie, setMovie] = useState({});

    const {id} = match.params;

    useEffect(() => {
        tmdb().get(`/movie/${id}`).then(data => {
            setMovie({
                ...data.data,
            });
        })
    }, [id]);

    if (!movie) {
        return <p>Please wait...</p>;
    }

    return <Movie {...props} movie={movie} baseURL={configuration.base_url || ''} detailedCard={true} />
}

export default MovieDetail;
