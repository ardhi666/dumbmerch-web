import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navbar";
import data from "../DataProduct";
import rupiahFormat from 'rupiah-format';
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

const ListProductComponent = () => {
    let api = API();

    let navigate = useNavigate()
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
  

    const handleEdit = (id) => {
        navigate('/edit-product/' + id);
    };

    let { data: products, refetch } = useQuery("productsCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await api.get("/products", config);
        return response.data.products
    });

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };


    const deleteById = useMutation(async (id) => {
        try {
            const config = {
                method: "DELETE",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
            };
            await api.delete(`/product/${id}`, config);
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
        },
        review: {
            width: "25%",
            height: "15%"
        },
        product: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "50px"
        }
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Navigation />
            <div className="list-product">
                <div className="table-name">
                    <h2>List Product</h2>
                    <div className="btn-add-product">
                        <Link to="/add-product">
                            <Button variant="warning">Add Product</Button>
                        </Link>
                    </div>
                    <br />
                </div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Product Desc</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Action</th>
                        </tr>
                        {products?.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={data.image} style={style.review} alt={data.tittle} /></td>
                                <td>{data.title}</td>
                                <td style={style.product}>{data.Desc}</td>
                                <td>{rupiahFormat.convert(data.price)}</td>
                                <td>{data.stock}</td>
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
                        <Modal.Title>Delete Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure delete this Product
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={setConfirmDelete} variant="success" style={style.btn1}>
                            Yes
                        </Button>
                        <Button variant="danger" style={style.btn2} onClick={handleClose}>No</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        </div>
    );
};
export default ListProductComponent;
