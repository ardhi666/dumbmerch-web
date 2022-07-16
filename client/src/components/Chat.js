import React from "react";
import Admin from '../assets/img/Admin.jpg'

export default function Chat({ contact, user, messages, sendMessage }) {
    return (
        <>
            {contact ? (
                <>
                    <div id="chat-messages" style={{ height: "75vh" }} className="chat-container overflow-auto">
                        {messages.map((data, index) => (
                            <div key={index}>
                                <div className={`bubble d-flex ${data.idSender === user.id ? "justify-content-end" : "justify-content-start"}`}>
                                    {data.idSender !== user.id && (
                                        <img src={contact.profile?.image || Admin} className="rounded-circle me-2 img-chat" alt="bubble avatar" />
                                    )}
                                    <div
                                        className={`chat-history {data.idSender === user.id ? "chat-me" : "chat-other"}`}>{data.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="send-chat">
                        <input placeholder="Send Message" className="input-message" onKeyPress={sendMessage} />

                    </div>
                </>
            ) : (
                <div
                    style={{ height: "89.5vh" }}
                    className="h4 d-flex justify-content-center align-items-center"
                >
                    <h2 style={{ color: "white" }}>No Message</h2>
                </div>
            )}
        </>
    );
}