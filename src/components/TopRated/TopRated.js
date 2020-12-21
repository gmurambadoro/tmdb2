import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import tmdb from "../../services/tmdb";
import {Col, Row} from "react-bootstrap";
import ColumnSort from "../ColumnSort/ColumnSort";
import Movies from "../Movies/Movies";

function TopRated({ configuration, ...props }) {
    const DEFAULT_SORT_FIELD = {id: 'default', name: 'Default'};

    const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD.id);

    const [movies, setMovies] = useState([]); // top-rated movies

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

    useEffect(() => paginateMovies(pagination.currentPage), [pagination.currentPage]);

    const changeDefaultSort = (field) => {
        setSortField(field);
    }

    const sortColumns = [
        DEFAULT_SORT_FIELD,
        {
            id: 'title.asc',
            name: 'Title (A-Z)',
        },
        {
            id: 'title.desc',
            name: 'Title (Z-A)',
        },
    ];

    const sortMovies = (data) => {
        const [title, direction] = sortField.split('.');

        switch (title) {
            case 'title':
                if (direction !== 'asc') {
                    return data.sort((m1, m2) => m1.title < m2.title);
                }

                return data.sort((m1, m2) => m1.title >= m2.title);

            default:
                return data;
        }
    };

    const sortedMovies = sortMovies([...movies.results || []]);

    return (
        <Row>
            <Col md={3}>
                <ColumnSort
                    columns={sortColumns}
                    handleSelection={changeDefaultSort}
                    sortField={sortField}
                />
            </Col>

            <Col>
                <h3>Top Rated Movies</h3>

                <Movies
                    movies={sortedMovies}
                    baseURL={configuration.base_url || ''}
                    {...props}
                />
            </Col>
        </Row>
    );
}

TopRated.propTypes = {
    configuration: PropTypes.object.isRequired,
};

export default TopRated;