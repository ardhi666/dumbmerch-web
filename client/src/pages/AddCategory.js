import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form } from "react-bootstrap";
import Navigation from "../components/Navbar";
import { useMutation } from "react-query";
import {API} from '../config/api.js'
import { useNavigate } from "react-router-dom";

const AddCategory = () => {

    let api = API()

    const navigate = useNavigate()
    const [form, setForm] = useState({
        name:""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]:value})
    }

    const {tittle} = form

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const body = JSON.stringify(form)

            const config = {
                method:'POST',
                headers: {
                    Authorization: "Basic " + localStorage.token,
                    'Content-type': "application/json"
                },
                body:body
            }
            
            const response = await api.post('/category', config)
            navigate('/category')

        } catch (error) {
            console.log(error);
        }
    })


    return (
        <div>
            <Navigation/>
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