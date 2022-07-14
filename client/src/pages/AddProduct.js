import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form } from "react-bootstrap";
import Navigation from "../components/Navbar";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    let navigate = useNavigate();
    let api = API();
    const [preview, setPreview] = useState(null)
    

    const [form, setForm] = useState({
        image: '',
        title: '',
        desc: '',
        price: '',
        qty: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const { image, title, desc, price, qty } = form

            // Store data with FormData as object
            const formData = new FormData();
            formData.set('image', form.image[0], form.image[0].tittle)
            formData.set('title', form.title)
            formData.set('desc', form.desc)
            formData.set('price', form.price)
            formData.set('qty', form.qty)

            // Configuration
            const config = {
                method: "POST",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
                body: formData,
            };

            // Insert product data
            const response = await api.post("/product", config);
                navigate("/product");
        } catch (error) {
            console.log(error);
        }
    });

    const style = {
        review: {
            width: "7%",
            height: "7%",
            marginBottom: "20px"
        }
    }


    return (
        <div>
            <Navigation />
            <div className="add-product">
                <div className="add-product-tittle">
                    <h2>Add Product</h2>
                    <br />
                </div>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className="upload-product-img">
                        <input hidden onChange={handleChange} name="image" type="file" id="upload" />
                        <label id="upload" htmlFor="upload">Upload Image</label>
                    </div>
                    {preview && (
                        <div>
                            <img
                                src={preview}
                                style={style.review}
                                alt="preview"
                            />
                        </div>
                    )}
                    <div className="add-product-name">
                        <input onChange={handleChange} type="text" placeholder="Product Name" name="title" />
                    </div>
                    <div className="add-product-desc">
                        <textarea onChange={handleChange} placeholder="Product Desc" name="desc">
                        </textarea>
                    </div>
                    <div className="add-product-price">
                        <input onChange={handleChange} name="price" type="text" placeholder="Price" />
                    </div>
                    <div className="add-product-qty">
                        <input onChange={handleChange} name="qty" type="text" placeholder="Qty" />
                    </div>
                    <div className="add-product-qty mb-4">
                        <div className="add-product-qty">
                            <input name="category" type="text" placeholder="Category" />
                        </div>
                    </div>
                    <div className="btn-add-product">
                        <Button type="submit" variant="success">Add Product</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddProduct;