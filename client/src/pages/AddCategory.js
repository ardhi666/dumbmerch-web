import React, { useState, useEffect,useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form } from "react-bootstrap";
import Navigation from "../components/Navbar";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";


const AddCategory = () => {

    const [state, dispatch] = useContext(UserContext)
    let navigate = useNavigate();
    let api = API();

    const [form, setForm] = useState({
        name:""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]:value})
    }

    const {name} = form

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            
            const config = {
                method: "POST",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },body:form
            }
            const response = await api.post('/category',config)
            navigate('/category')
        } catch (error) {
            console.log(error);
        }

    })

    return (
        <div>
            <Navigation />
            <div className="edit-product">
                <div className="edit-product-tittle">
                    <h2>Add Category</h2>
                    <br />
                </div>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className="edit-product-name">
                    <input onChange={handleChange} value={form.name} type="text" placeholder="Catergory Name" name="name" />
                    </div>
                    <div className="btn-save">
                        <Button type="submit">Save</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddCategory;