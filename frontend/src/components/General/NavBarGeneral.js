import React from 'react'
import { Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { GiSewingString, GiClothes, GiRolledCloth } from 'react-icons/gi';
import { FaStoreAlt } from 'react-icons/fa';
import { TbNeedleThread } from 'react-icons/tb';
import { RiLoginBoxFill } from 'react-icons/ri';
import { VscPersonAdd } from 'react-icons/vsc';


import { Link } from 'react-router-dom';

const NavBarGeneral = () => {
    return (
        <Navbar className='navbars border ' expand="lg" style={{ backgroundColor: "#FFD4D4" }}>
            <Navbar.Brand as={Link} to="/" className='mx-3 px-2 py-2' style={{
                border: "solid",
                "borderRadius": " 5vh"
            }}>
                <h3>
                    <GiSewingString className='mx-2 ms-auto' />
                    <b>
                        ALL IN ONE TAILOR
                    </b>
                </h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar' />
            <Container fluid className='justify-content-evenly text-center' >
                <Navbar.Collapse >
                    <Row>
                        <Col lg={true} >
                            <Nav className=" fw-bold">
                                <Nav.Link as={Link} to="/products">
                                    <GiClothes />
                                    PRODUCTS
                                </Nav.Link>
                                <Nav.Link as={Link} to="/services"><GiRolledCloth />SERVICES</Nav.Link>
                                <Nav.Link as={Link} to="/shops"><FaStoreAlt />SHOPS</Nav.Link>
                                <Nav.Link as={Link} to="/tailors">
                                    <TbNeedleThread />TAILORS
                                </Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Navbar.Collapse >
            </Container>
            <Navbar.Collapse >
                <Container fluid className='justify-content-evenly text-center' >
                    <Nav className=" fw-bold" >
                        <Nav.Link as={Link} to="/login" >
                            <RiLoginBoxFill />LOGIN
                        </Nav.Link>
                        <Nav.Link as={Link} to="/register">
                            <VscPersonAdd />
                            REGISTER
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default NavBarGeneral