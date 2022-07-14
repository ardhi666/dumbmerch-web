import React from 'react'
import Navigation from '../components/Navbar'
import Contact from '../components/Contact'
import { Container, Row, Col } from 'react-bootstrap'



export default function Complain() {
    const style = {
        container: {
            height: "95vh"
        },
        row: {
            height: "95vh"
        }
    }


    return (
        <>
            <Navigation />
            <Container fluid style={style.container}>
                <Row>
                    <Col md={3} style={style.row} className="px-3 border-end border-dark overflow-auto">
                        <Contact />
                    </Col>
                    <Col md={9} style={style.row} className="px-0">
                    </Col>
                </Row>
            </Container>
        </>
    )
}