import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from "react-bootstrap";
import Navigation from "../components/Navbar";
import Keyboard from '../assets/img/Keyboard.png'
import rupiahFormat from 'rupiah-format';

const DetailProduct = () => {


    return (

        <div>
            <Navigation />
            <div className="detail-product">
                <div className="dtl-product-cont">
                    <div className="dtl-prdct">
                        <div className="dtl-prdct-left">
                            <div className="dtl-prdct-img">
                                <img src={Keyboard} alt='product' />
                            </div>
                        </div>
                        <div className="dtl-prdct-right">
                            <div className="dtl-prdct-name">
                                <h2>Keyboard</h2>
                            </div>
                            <div className="dtl-prdct-stock">
                                <p>Stock : 200</p>
                            </div>
                            <div className="dtl-prdct-desc">
                                <div className="dtl-prdct-detail">
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut, ducimus sed quod dolorum odit vero eum voluptate nostrum explicabo aspernatur distinctio optio est autem ea. Fuga incidunt non recusandae rerum ipsa voluptatem necessitatibus laborum. Quae consequuntur tempore nemo officiis voluptate!</p>
                                </div>
                                <div className="dtl-prdct-price">
                                    <h2>{rupiahFormat.convert(690000)}</h2>
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