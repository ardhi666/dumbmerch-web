import React from "react";
import Admin from '../assets/img/Admin.jpg'

export default function Contact({ dataContact, clickContact, contact }) {

    return (
        <>
            {dataContact.length > 0 && (
                <>
                    {dataContact.map((data) => (
                        <div key={data.id} className={`wrapper ${contact?.id === data?.id && "contact-active"}`} onClick={() => { clickContact(data) }}>
                            <div className="container">
                                <div className="image">
                                    <img src={data.profile?.image || Admin} alt={Admin} />
                                </div>
                                <div className="right">
                                    <div className="name">
                                        <b>{data.name}</b>
                                    </div>
                                    <div className="message">
                                        <p>{data.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}