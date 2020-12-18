import React from "react";
import PropType from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ColumnSort({ columns, handleSelection, sortField }) {
    const Option = (col, selected = false) => {
        const { id, name } = col;

        return <option value={id} selected={id === sortField}>{name}</option>
    };

    const handleColumnSelected = (e) => {
        e.preventDefault();

        handleSelection(e.target.value);
    };

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <strong>Sort</strong>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <p>Sort Results By</p>

                        <select required className="form-control" onChange={handleColumnSelected}>
                            {
                                columns.map(c => (
                                    <React.Fragment key={c.id}>
                                        {Option(c, sortField)}
                                    </React.Fragment>
                                ))
                            }
                        </select>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

ColumnSort.propTypes = {
    columns: PropType.array.isRequired,
    sortField: PropType.string.isRequired,
};

export default ColumnSort;