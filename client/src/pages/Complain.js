import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/Navbar'
import Contact from '../components/Contact'
import { Container, Row, Col } from 'react-bootstrap'
import { io } from 'socket.io-client'
import Chat from '../components/Chat'
import { UserContext } from '../context/userContext'


let socket

export default function Complain() {

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

    useEffect(() =>{
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem("token")
            },
            // code here
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
        // emit event load admin contact
        socket.emit("load admin contact")
        // listen event to get admin contact
        socket.on("admin contact", (data) => {
            // manipulate data to add message property with the newest message
            // code here
            let dataContact = {
                ...data,
                message: messages.length > 0 ? messages[messages.length - 1].messages : "Click here to start message"
            }
            setContacts([dataContact])
        })
    }
    const loadMessages = (value) => {
            
        socket.on("messages", async(data)=>{
            if(data.length>0){
                const dataMessages = data.map((item)=>({
                    idSender:  item.sender.id,
                    message: item.message
                }))
                setMessages(dataMessages)
            }
        })
    }
    
    const onClickContact = (data) => {
        setContact(data)
        socket.emit("load messages",data.id)
    }

    const onSendMessage = (e)=>{
        if(e.key === 'Enter'){
            const data = {
                idRecipient: contact.id,
                message: e.target.value
            }

            socket.emit("send messages",data)
            e.target.value = ""
        }
    }
    

    return (
        <>
            <Navigation />
            <Container fluid style={style.container}>
                <Row>
                    <Col md={3} style={style.row} className="px-3 border-end border-dark overflow-auto">
                        <Contact dataContact={contacts} clickContact={onClickContact} contact={contact}/>
                    </Col>
                    <Col md={9} style={style.row} className="px-0">
                        <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage}/>
                    </Col>  
                </Row>
            </Container>
        </>
    )
}