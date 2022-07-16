import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from "react-bootstrap";
import Navigation from "../components/Navbar";
import Keyboard from '../assets/img/Keyboard.png'
import rupiahFormat from 'rupiah-format';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import { useParams } from "react-router-dom";

const DetailProduct = () => {

    let api = API()
    let { id } = useParams();

    let { data: product, refetch } = useQuery('productCache', async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        };
        const response = await api.get('/product/' + id,config)
        return response.data.products
    })

    return (

        <div>
            <Navigation />
            <div className="detail-product">
                <div className="dtl-product-cont">
                    <div className="dtl-prdct">
                        <div className="dtl-prdct-left">
                            <div className="dtl-prdct-img">
                                <img src={product?.image} alt='product' />
                            </div>
                        </div>
                        <div className="dtl-prdct-right">
                            <div className="dtl-prdct-name">
                                <h2>{product?.title}</h2>
                            </div>
                            <div className="dtl-prdct-stock">
                                <p>Stock : {product?.qty}</p>
                            </div>
                            <div className="dtl-prdct-desc">
                                <div className="dtl-prdct-detail">
                                    <p>{product?.desc}</p>
                                </div>
                                <div className="dtl-prdct-price">
                                    <h2>{rupiahFormat.convert(product?.price)}</h2>
                                </div>
                                <Button variant="danger">BUY</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailProduct