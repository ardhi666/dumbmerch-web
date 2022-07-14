import React from "react";
import Admin from '../assets/img/Admin.jpg'

export default function Contact() {


    return (
        <>
                        <div className='wrapper'>
                            <div className="container">
                                <div className="image">
                                    <img src={Admin} alt={Admin} />
                                </div>
                                <div className="right">
                                    <div className="name">
                                        <b>Admin</b>
                                    </div>
                                    <div className="message">
                                        <p>Yes, is there anything i can help</p>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    );
}