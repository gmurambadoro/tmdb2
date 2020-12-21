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

    console.log(movie);

    return <Movie {...props} movie={movie} baseURL={configuration.baseURL || ''} detailedCard={true} />
}

export default MovieDetail;
