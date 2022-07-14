import Logo from "../assets/img/Logo.png"
import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function Navigation() {
    let Navigate = useNavigate()
    // const navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const handleLogout = () => {
        dispatch({
            type:'LOGOUT',
        })
        Navigate('/login')
    }

    return (
        <Nav className="navbar fw-bold navbar-expand-lg navbar-dark p-4" style={{ fontSize: '20px', fontWeight: '400' }}>
            <div className="container-fluid">
                <div className="navbar-brand" href="/src/pages/Home.js">
                    <Link to="/">
                        <img src={Logo} alt="Logo" width="70px" />
                    </Link>
                </div>
                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav me-auto mb-lg-0">
                    </ul>
                    <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-lg-0"> 
                            {state.isLogin === true && state.user.status === "customer" && <>  <li className="nav-item me-2">
                                    <Link to="/profile" style={{ textDecoration: "none", fontSize: "20px", color: "white", paddingRight: "20px" }}>Profile</Link>
                                </li>
                                
                                <li className="nav-item me-2">
                                    <Link to="/complain" style={{ textDecoration: "none", fontSize: "20px", color: "white", paddingRight: "20px" }}>Complain</Link>
                                </li>
                                </>
                                }
                            {state.isLogin === true && state.user.status === "admin" && <>  
                                    <li className="nav-item me-2">
                                        <Link to="/product" style={{ textDecoration: "none", fontSize: "20px", color: "white", paddingRight: "20px" }}>Product</Link>
                                    </li>
                                    <li className="nav-item me-2">
                                        <Link to="/category" style={{ textDecoration: "none", fontSize: "20px", color: "white", paddingRight: "20px" }}>Category</Link>
                                    </li>
                                    <li className="nav-item me-2">
                                        <Link to="/complain-admin" style={{ textDecoration: "none", fontSize: "20px", color: "white", paddingRight: "20px" }}>Complain</Link>
                                    </li> 
                                </>
                                }
                                {state.isLogin === false ? <li className="nav-item me-2">
                                <Link to="/login" style={{ textDecoration: "none", fontSize: "20px", color: "white", paddingRight: "20px" }}>Sign In</Link>
                            </li> : <li className="nav-item me-2">
                                    <a style={{ textDecoration: "none", fontSize: "20px", color: "white", paddingRight: "20px", cursor: "pointer" }} onClick={handleLogout}>Log Out</a>
                                </li> }
                        </ul>
                    </div>
                </div>
            </div>
        </Nav>
    )
}

export default Navigation;