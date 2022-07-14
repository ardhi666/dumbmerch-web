import React, { useState, useEffect, createElement } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form } from "react-bootstrap";
import Navigation from "../components/Navbar";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";

const EditProductComponent = () => {

    let navigate = useNavigate();
    let api = API();
    const { id } = useParams();
    const [product, setProduct] = useState({}); //Store product data

    const [preview, setPreview] = useState(null)

    const [form, setForm] = useState({
        image: "",
        title: "",
        desc: "",
        price: "",
        qty: "",
    }); //Store product data

    let { productRefetch } = useQuery("productCache", async () => {
        const config = {
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await api.get("/product/" + id, config);
        setForm({
            title: response.data.title,
            desc: response.data.desc,
            price: response.data.price,
            qty: response.data.qty,
            image: response.data.image,
        });
        setProduct(response.data);
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === "file") {
            setPreview(e.target.files);
        }
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Store data with FormData as object
            const formData = new FormData();
            if (preview) {
                formData.set("image", preview[0], preview[0]?.name);
            }
            formData.set("title", form.title);
            formData.set("desc", form.desc);
            formData.set("price", form.price);
            formData.set("qty", form.qty);

            // Configuration
            const config = {
                method: "PATCH",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
                body: formData,
            };

            // Insert product data
            const response = await api.patch("/product/" + product.id, config);

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
            <div className="edit-product">
                <div className="edit-product-tittle">
                    <h2>Edit Product</h2>
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
                        <input onChange={handleChange} value={form.title} type="text" placeholder="Product Name" name="title" />
                    </div>
                    <div className="add-product-desc">
                        <textarea onChange={handleChange} value={form.desc} placeholder="Product Desc" name="desc">
                        </textarea>
                    </div>
                    <div className="add-product-price">
                        <input onChange={handleChange} value={form.desc} name="price" type="text" placeholder="Price" />
                    </div>
                    <div className="add-product-qty">
                        <input onChange={handleChange} value={form.qty} name="qty" type="text" placeholder="Qty" />
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

export default EditProductComponent;