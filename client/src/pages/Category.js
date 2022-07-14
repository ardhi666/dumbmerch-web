import React, { useState } from "react"
import { Table, Button, Modal } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom";
import Navigation from "../components/Navbar";


const CategoryComponent = () => {


    const style = {
        btn1: {
            backgroundColor: "#f74d4d",
            padding: "5px 45px",
            border: "none"
        },
        btn2: {
            backgroundColor: "#56c05a",
            padding: "5px 45px",
            border: "none"
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Navigation />
            <div className="table-container">
                <div className="table-name">
                    <h2>List Category</h2>
                    <div className="btn-add-category">
                        <Link to="/add-category">
                            <Button variant="warning">Add Category</Button>
                        </Link>
                    </div>
                    <br />
                </div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Tech</td>
                            <td>
                            <Link to="/edit-category">
                                <Button className="btn-edit">Edit</Button>
                            </Link>
                                    <Button onClick={handleShow} className="btn-delete">Delete</Button>
                                </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Outfit</td>
                            <td>
                            <Link to="/edit-category">
                                <Button className="btn-edit">Edit</Button>
                            </Link>
                                    <Button onClick={handleShow} className="btn-delete">Delete</Button>
                                </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Sport</td>
                            <td>
                            <Link to="/edit-category">
                                <Button className="btn-edit">Edit</Button>
                            </Link>
                                    <Button onClick={handleShow} className="btn-delete">Delete</Button>
                                </td>
                        </tr>
                    </thead>
                </Table>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Delete Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure delete this Category
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" style={style.btn1}>
                            Yes
                        </Button>
                        <Button onClick={handleClose} variant="danger" style={style.btn2}>No</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        </div>
    );
};
export default CategoryComponent;
