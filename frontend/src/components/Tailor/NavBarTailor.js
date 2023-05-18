import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiSewingString, GiRolledCloth, GiClothes } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { IoIosPerson } from 'react-icons/io';
import { TbNeedleThread } from 'react-icons/tb';
import { SiPowerpages } from 'react-icons/si';
import { GrUnorderedList } from 'react-icons/gr';
import { RiAccountCircleFill,RiLogoutBoxRFill } from 'react-icons/ri';
import { FaStoreAlt } from 'react-icons/fa';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { UserState } from '../../context/UserState';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NavBarTailor = () => {
    const { set_user_state, set_at, set_rt } = useContext(UserState)
    const handle_logout = () => {
        set_user_state("general")
        set_rt('')
        set_at('')
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar className='navbars border rounded' expand="lg" style={{ backgroundColor: "#FFD4D4" }}>
                <Navbar.Brand as={Link} to="/" className='mx-3 px-2 py-2 me-auto' style={{
                    border: "solid",
                    "borderRadius": " 5vh"
                }}>
                    <Container className='text-center justify-content-center align-content-center'>
                        <Row>
                            <Col>
                                <h3>
                                    <GiSewingString className='mx-2' />
                                    <b>
                                        ALL IN ONE TAILOR
                                    </b>
                                </h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TbNeedleThread />
                                TAILOR
                            </Col>
                        </Row>
                    </Container>

                </Navbar.Brand>
                <Navbar.Toggle aria-controls='navbar' className='mx-auto' />

                <Container className='mx-auto mx-2 px-2 justify-content-center text-center' >
                    <Navbar.Collapse >
                        <Col>
                        </Col>
                        <Col>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/portfolio" className='my-3'>
                                    <SiPowerpages />
                                    PORTFOLIO
                                </Nav.Link>
                                <Nav.Link as={Link} to="/account" className='my-3'>
                                    <RiAccountCircleFill />
                                    ACCOUNT
                                </Nav.Link>
                                <Nav.Link as={Link} to="/orders" className='my-3'>
                                    
                                    <GrUnorderedList />
                                    ORDERS
                                </Nav.Link>
                                <Nav.Link as={Link} to="/shops" className='my-3'>
                                    <FaStoreAlt />
                                    SHOPS
                                </Nav.Link>
                                <Nav.Link as={Link} to="/services" className='my-3'>
                                    <GiRolledCloth />
                                    SERVICES
                                </Nav.Link>
                                <Nav.Link as={Link} to="/products" className='my-3'>
                                    <GiClothes />
                                    PRODUCTS
                                </Nav.Link>
                                <Nav.Link onClick={() => handle_logout()} className='my-3'>
                                    <RiLogoutBoxRFill />
                                    LOGOUT
                                </Nav.Link>

                                {/* <h1 onClick={handleShow}>
                                    <IoIosPerson className='' style={{ "margin": "15px", "border": "solid black", "borderRadius": "5vw" }} />
                                </h1> */}
                            </Nav>
                        </Col>
                    </Navbar.Collapse>

                </Container>

            </Navbar >
            {/* 
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas> */}
        </>

    )
}

export default NavBarTailor