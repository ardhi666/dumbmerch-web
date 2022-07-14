import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from "react-bootstrap";
import Navigation from "../components/Navbar";

const EditCategory = () => {
    return (
        <div>
            <Navigation/>
        <div className="edit-product">
            <div className="edit-product-tittle">
                <h2>Edit Category</h2>
                <br />
            </div>
            <form>
                <div className="edit-product-name">
                    <input type="text" placeholder="Catergory Name" />
                </div>
                <div className="btn-save">
                    <Button>Save</Button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default EditCategory;