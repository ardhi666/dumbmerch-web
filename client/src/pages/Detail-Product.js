import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from "react-bootstrap";
import Navigation from "../components/Navbar";
import rupiahFormat from 'rupiah-format';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import { useNavigate, useParams } from "react-router-dom";

const DetailProduct = () => {
    let navigate = useNavigate()
    let { id } = useParams();

    let { data: product, refetch } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id)
        return response.data.data.products
    })

    const handleBuy = useMutation(async () => {
        try {
            // Get data from product
            const data = {
                idProduct: product.id,
                idSeller: product.idUser,
                price: product.price,
            };

            // Data body
            const body = JSON.stringify(data);
            
            // Configuration
            const config = {
                headers: {
                    Authorization: "Basic " + localStorage.token,   
                    "Content-type": "application/json"
                }
            };
            // Insert transaction data
            const response = await API.post("/transaction",body,config);
            console.log(response);

            const token = response.data.payment.token;

            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment");
                },
            });
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-sFeJI7TYqGZ8GKL-";

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

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
                                <Button onClick={() => handleBuy.mutate()} variant="danger">BUY</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailProduct