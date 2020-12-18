import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import tmdb from "../../services/tmdb";
import {Col, Row} from "react-bootstrap";
import ColumnSort from "../ColumnSort/ColumnSort";
import Movies from "../Movies/Movies";

function TopRated({ configuration }) {
    const [movies, setMovies] = useState([]); // top-rated movies
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });

    const paginateMovies = (page) => {
        tmdb()
            .get('/movie/top_rated', { page: page })
            .then(data => {
                setMovies(() => ({
                    ...data.data,
                }));
            });
    };

    useEffect(() => paginateMovies(1), [configuration]);

    useEffect(() => paginateMovies(currentPage), [currentPage]);

    const changeDefaultSort = (col) => {
        console.log(col);
    }

    const sortColumns = [
        {
            id: 'title_az',
            name: 'Title (A-Z)',
        },
        {
            id: 'title_za',
            name: 'Title (Z-A)',
        },
    ];

    return (
        <Row>
            <Col md={3}>
                <ColumnSort columns={sortColumns} handleSelection={changeDefaultSort} />
            </Col>

            <Col>
                <h3>Top Rated Movies</h3>

                <Movies movies={[...(movies.results || [])]} baseURL={configuration.base_url} />
            </Col>
        </Row>
    );
}

TopRated.propTypes = {
    configuration: PropTypes.object.isRequired,
};

export default TopRated;