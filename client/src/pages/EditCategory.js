import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form } from "react-bootstrap";
import Navigation from "../components/Navbar";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {

    let navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState({ name: "" });

    let { data: categoryData } = useQuery('categoryCache', async () => {
        const response = await API.get('/category/' + id);
        return response.data.data.catagorys.name
    });

    
    useEffect(() => {
        if (categoryData) {
            setCategory({ name: categoryData });
        }
    }, [categoryData]);

    const handleChange = (e) => {
        setCategory({
            ...category,
            name: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const body = JSON.stringify(category);
            const config = {
                headers: {
                    'Content-type': "application/json"
                }
            }
            const response = await API.patch('/category/' + id, body, config);
            navigate('/category')
        } catch (error) {
            console.log(error);
        }
    });

    return (

        <div>
            <Navigation />
            <div className="edit-product">
                <div className="edit-product-tittle">
                    <h2>Edit Category</h2>
                    <br />
                </div>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className="edit-product-name">
                        <input onChange={handleChange} value={category.name} type="text" placeholder="Catergory Name" name="name" />
                    </div>
                    <div className="btn-save">
                        <Button type="submit">Save</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditCategory;