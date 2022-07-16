import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/Navbar'
import Contact from '../components/Contact'
import { Container, Row, Col } from 'react-bootstrap'
import { io } from 'socket.io-client'
import Chat from '../components/Chat'
import { UserContext } from '../context/userContext'

let socket

export default function ComplainAdmin() {


    const style = {
        container: {
            height: "95vh"
        },
        row: {
            height: "95vh"
        }
    }

    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [state, setState] = useContext(UserContext)

    useEffect(() => {
        socket = io('http://localhost:5000', {
            // code here
            auth: {
                token: localStorage.getItem("token") // we must set options to get access to socket server
            },
            query: {
                id: state.user.id
            }
        })

        socket.on("new message", () => {
            socket.emit("load messages", contact?.id)
        })

        socket.on("connect_error", (err) => {
            console.error(err.message); // not authorized
        });

        loadMessages()
        loadContact()
        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContact = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            let dataContacts = data.filter((item)=> (item.status !== "admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))
            dataContacts = dataContacts.map((item) => ({
                ...item,
                message: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length -1].message : "Click here to start message"
            }))
            setContacts(dataContacts)
        })
    }

    const onClickContact = (data) => {
        setContact(data)
        socket.emit('load messages', data.id)
    }

    const loadMessages = (value) => {
        socket.on('messages', (data)=> {
            if(data.length > 0){
                const dataMessages = data.map((item)=> ({
                    idSender: item.sender.id,
                    message: item.message
                }))
                setMessages(dataMessages);

            }
        })
        loadContact()
        let chatMessages = document.getElementById('chat-messages')
        // chatMessages.scrollTop = chatMessages?.scrollHeight
    }   

    const onSendMessage = (e) => {
        if(e.key === "Enter"){
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }
            socket.emit('send messages', data)
            e.target.value = ""
        }
    }

    return (
        <>
            <Navigation />
            <Container fluid style={style.container}>
                <Row>
                    <Col md={3} style={style.row} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                    </Col>
                    <Col md={9} style={style.row} className="px-0">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}/>
                    </Col> 
                </Row>
            </Container>
        </>
    )
}