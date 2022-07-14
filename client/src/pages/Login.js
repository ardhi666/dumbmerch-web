import Logo from "../assets/img/Logo.png"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form, Alert } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import Navigation from "../components/Navbar"
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/api";

function LoginComponent() {

    let navigate = useNavigate()
    let api = API();

    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            // Data body
            const body = JSON.stringify(form);

            // Configuration
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },  body: body,
            };

            // Insert data for login process
            const response = await api.post("/login", config);

            // Checking process
            if (response.status == "success") {
                // Send data to useContext
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.users
                });

                // Status check
                if (response.data.users.status == "admin") {
                    navigate("/product");
                } else {
                    navigate("/");
                }

                const alert = (
                    <Alert variant="success" className="py-1">
                        {response.message}
                    </Alert>
                );
                setMessage(alert);
            } else {
                const alert = (
                    <Alert variant="danger" className="py-1">
                        {response.message}
                    </Alert>
                );
                setMessage(alert);
            }
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    {error}
                </Alert>
            );
            setMessage(alert);
        }
    });

    const style = {
        form_input: {
            color: 'white',
            border: '1px solid white',
            backgroundColor: '#474747',
            marginBottom: '30px'
        },
        btn_style: {
            borderRadius: '7px',
            cursor: 'pointer',
            color: 'white',
            padding: '5px 180px',
            fontSize: '20px',
            fontWeight: '500',
            marginTop: '20px'
        },
        btn_rnd: {
            backgroundColor: '#dc3545',
            border: 'none',
            color: 'white',
            padding: '15px 100px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '20px',
            borderRadius: '10px'
        },
        btn_rnd2: {
            backgroundColor: 'black',
            border: 'none',
            color: 'white',
            padding: '15px 100px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '20px'
        }
    }

    return (

        <div>
            <Navigation />
            <div className="form">
                <div className="container text-white p-3 mt-5">
                    <div className="row mt-5 mb-5 ms-auto me-auto">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-column justify-content-between w-100">
                                <img src={Logo} alt="Logo" className="rounded float-start mb-4" style={{ width: "50%" }} />
                                <h1 className='fw-bold mb-3' style={{ fontSize: '50px' }}>Easy, Fast and Reliable</h1>
                                <p className='col-md-9' style={{ fontWeight: 400, color: 'grey', fontSize: '20px', marginTop: '30px' }}>Go Shopping for Merchandise, just go to DumbMerch Shopping. The biggest merchandise in <b>Indonesia</b></p>
                                <div className="btn-group" style={{ marginTop: '20px' }}>
                                    <Link to="/Login">
                                        <Button className="button button3" style={style.btn_rnd}>Login</Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button className="button button3" style={style.btn_rnd2}>Register</Button>
                                    </Link>
                                </div>
                            </div>
                            <div style={{ width: '50%' }}>
                                <div className="card m-5 p-4 pt-2" style={{ backgroundColor: '#181818', borderRadius: '13px' }}>
                                    <div className="card-body">
                                        <h1 style={{ fontSize: "50px", marginBottom: "30px", fontWeight: "600" }}>Login</h1>
                                        {message && message}
                                        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                                            <div className="mb-3">
                                            <input onChange={handleChange} value={email} type="email" className="form-control p-2" style={style.form_input} placeholder='Email' id="email" name="email" />
                                            </div>
                                            <div className="mb-3">
                                            <input onChange={handleChange} value={password} type="password" className="form-control p-2" style={style.form_input} placeholder='Password' id="password" name="password" />
                                            </div>
                                            <Button type="submit" variant="danger" style={style.btn_style}>Login</Button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;