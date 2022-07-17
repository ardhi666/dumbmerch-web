import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Form } from "react-bootstrap";
import Navigation from "../components/Navbar";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {

    let navigate = useNavigate();
    const [preview, setPreview] = useState(null)
    const [categories, setCategories] = useState([]); //Store all category data
    const [categoryId, setCategoryId] = useState([]); //Save the selected category id

    const getCategories = async () => {
        try {
            const response = await API.get('/categorys')
            setCategories(response.data.categories)
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeCategoryId = (e) => {
        const id = e.target.value;
        const checked = e.target.checked;

        if (checked) {
            // Save category id if checked
            setCategoryId([...categoryId, parseInt(id)]);
        } else {
            // Delete category id from variable if unchecked
            let newCategoryId = categoryId.filter((categoryIdItem) => {
                return categoryIdItem != id;
            });
            setCategoryId(newCategoryId);
        }
    };


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

            // Store data with FormData as object
            const formData = new FormData();
            formData.set('image', form.image[0], form.image[0].tittle)
            formData.set('title', form.title)
            formData.set('desc', form.desc)
            formData.set('price', form.price)
            formData.set('qty', form.qty)
            formData.set('categoryId', categoryId);

            // Configuration
            const config = {
                headers: {
                    'Content-type': "multipart/form-data"
                }
            };

            // Insert product data
            const response = await API.post("/product", formData, config);
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

    useEffect(() => {
        getCategories();
    }, []);



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
                    <div className="card-form-input px-2 py-1 pb-2">
                        <div
                            className="text-secondary mb-1"
                            style={{ fontSize: '15px' }}
                        >
                            Category
                        </div>
                        {categories.map((item, index) => (
                            <label className="checkbox-inline me-4" key={index}>
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    onClick={handleChangeCategoryId}
                                />{' '}
                                {item.name}
                            </label>
                        ))}
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