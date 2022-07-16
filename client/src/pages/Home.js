import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import Navigation from "../components/Navbar";
import data from "../DataProduct";
import Search from '../assets/img/search.png'
import rupiahFormat from 'rupiah-format';
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";

function Home() {

    const [filter, setFilter] = useState('')
    const searchText = (e) => {
        setFilter(e.target.value)
    }

    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get('/products')
        return response.data.data.products
    })

    let dataSearch = data.product.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    })


    return (
        <div>
            <Navigation />
            <div className="project">
                <div className="project-container">
                    <div className="tittle">
                        <h1>Product</h1>
                    </div>
                    {/* <div className="search">
                        <img src={Search} alt="Search" />
                        <input type="text" placeholder="Search Product" value={filter} onChange={searchText.bind(this)} />
                    </div> */}
                    <div className="content">
                        {products?.map((data, index) => {
                            return (
                                <div key={index} className="card">
                                    <div className="img">
                                        <Link to={`/detail-product/` + data?.id}>
                                            <img src={data?.image} alt='keyboard' />
                                        </Link>
                                    </div>
                                    <div className="product-name">
                                        <h2>{data?.title}</h2>
                                    </div>
                                    <div className="description">
                                        <p>{rupiahFormat.convert(data?.price)}</p>
                                        <p>Stock : {data?.qty}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;