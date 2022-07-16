import React, { useState, useEffect } from "react";
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

    let { data: products, refetch } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id)
        return response.data.data.products
    })

    useEffect(() => {
        if (products) {
            setPreview(products.image)
            setForm({
                title: products.title,
                desc: products.desc,
                price: products.price,
                qty: products.qty
            })
            setProduct(products)
        }
    }, [products])

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

            // Store data with FormData as object
            const formData = new FormData();
            if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name);
            }
            formData.set("name", form.name);
            formData.set("desc", form.desc);
            formData.set("price", form.price);
            formData.set("qty", form.qty);
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            };
            // Insert product data
            const response = await API.patch('/product/' + id, formData, config);
            // navigate("/product");
            console.log(response);
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
                        <label id="upload" htmlFor="upload">Upload file</label>
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
                        <input onChange={handleChange} value={form?.title} type="text" placeholder="Product Name" name="title" />
                    </div>
                    <div className="add-product-desc">
                        <textarea onChange={handleChange} value={form?.desc} placeholder="Product Desc" name="desc">
                        </textarea>
                    </div>
                    <div className="add-product-price">
                        <input onChange={handleChange} value={form?.price} name="price" type="text" placeholder="Price" />
                    </div>
                    <div className="add-product-qty">
                        <input onChange={handleChange} value={form?.qty} name="qty" type="text" placeholder="Qty" />
                    </div>
                    <div className="add-product-qty mb-4">
                        <div className="add-product-qty">
                            <input name="category" type="text" placeholder="Category" />
                        </div>
                    </div>
                    <div className="btn-add-product">
                        <Button type="submit" variant="success">Update Product</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditProductComponent;