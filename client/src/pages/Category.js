import React, { useEffect, useState } from "react"
import { Table, Button, Modal } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navbar";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import axios from 'axios'


const CategoryComponent = () => {

    let api = API()
    let navigate = useNavigate()

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let { data: category, refetch } = useQuery("categorysCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await api.get("/categorys", config);
        return response.categories
    });

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    const handleEdit = (id) => {
        navigate('/edit-category/' + id);
    };

    const deleteById = useMutation(async (id) => {
        try {
            const config = {
                method: "DELETE",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
            };
            await api.delete(`/category/${id}`, config);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        if (confirmDelete) {
            // Close modal confirm delete data
            handleClose();
            // execute delete data by id function
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete]);

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

    return (
        <div>
            <Navigation />
            <div className="table-container">
                <div className="table-name">
                    <h2>List Category</h2>
                    <div className="btn-add-category">
                        <Link to="/add-category">
                            <Button variant="dark">Add Category</Button>
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
                        {category?.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.name} </td>
                                <td>
                                    <Button onClick={() => {
                                        handleEdit(data.id);
                                    }} className="btn-edit">Edit</Button>
                                    <Button onClick={() => {
                                        handleDelete(data.id);
                                    }} className="btn-delete">Delete</Button>
                                </td>
                            </tr>
                        ))}
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
                        <Button onClick={setConfirmDelete} variant="success" style={style.btn1}>
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
