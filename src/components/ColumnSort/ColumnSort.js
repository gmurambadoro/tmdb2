import React from "react";
import PropType from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ColumnSort({ columns = [], handleSelection }) {
    const Option = (col, selected = false) => {
        const { id, name } = col;

        return <option value={id} selected>{name}</option>
    };

    const handleColumnSelected = (e) => {
        e.preventDefault();

        console.log(e);

        handleSelection({test: 'test'});
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
                            <option value="default">Default</option>

                            {
                                columns.map(c => (
                                    <React.Fragment key={c.id}>
                                        {Option(c)}
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
};

export default ColumnSort;