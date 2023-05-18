import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiSewingString, GiRolledCloth, GiClothes } from 'react-icons/gi';
import { TbGridDots } from 'react-icons/tb';
import { Link, redirect } from 'react-router-dom';
import { RiAdminFill, RiLogoutBoxRFill } from 'react-icons/ri';
import { MdOutlineContacts, MdExpandMore } from 'react-icons/md';
import { AiFillUnlock, AiOutlineUnorderedList } from 'react-icons/ai';
import { BiMessageRoundedX } from 'react-icons/bi';
import { FaTools, FaStoreAlt } from 'react-icons/fa';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { UserState } from '../../context/UserState';
import { Row, Col, Button, Stack } from 'react-bootstrap';

const NavBarAdmin = () => {
    // const { set_user_state, set_rt, set_at } = useContext(UserState)
    // const handle_logout = () => {
    //     set_user_state("general")
    //     set_rt('')
    //     set_at('')
    // }
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // return (
    //     <>
    //         <Navbar className='navbars border rounded' style={{ backgroundColor: "#FFD4D4" }}>
    //             <Navbar.Brand as={Link} to="/" className='mx-3 px-2 py-2' style={{
    //                 border: "solid",
    //                 "borderRadius": " 20vh 10vh"
    //             }}>
    //                 <h3>
    //                     <GiSewingString className='mx-2 ms-auto' />
    //                     <b>
    //                         ALL IN ONE TAILOR
    //                     </b>
    //                 </h3>
    //             </Navbar.Brand>
    //             <b>
    //                 <p style={{ "padding": "5px", "margin": "15px", "border": "solid black", "borderRadius": "20px 10px" }}>
    //                     ADMIN
    //                 </p>
    //             </b>

    //             <Container className='mx-auto mx-2 px-2' >
    //                 <Nav className="me-auto">
    //                     <Nav.Link as={Link} to="/products">
    //                         <b>
    //                             MY ACCOUNT
    //                         </b>
    //                     </Nav.Link>
    //                 </Nav>
    //             </Container>
    //             <b>
    //                 <Nav.Link onClick={() => handle_logout()} style={{ "padding": "5px", "margin": "15px", "border": "solid black", "borderRadius": "20px 10px" }}>
    //                     LOGOUT
    //                 </Nav.Link>
    //             </b>
    //             <div className="vr mx-2 " />

    //             <h1 onClick={handleShow}>
    //                 <IoIosPerson className='' style={{ "padding": "5px", "margin": "15px", "border": "solid black", "borderRadius": "20px 10px" }} />
    //             </h1>

    //         </Navbar >

    //         <Offcanvas show={show} onHide={handleClose} placement="end">
    //             <Offcanvas.Header closeButton>
    //                 <Offcanvas.Title>Offcanvas</Offcanvas.Title>
    //             </Offcanvas.Header>
    //             <Offcanvas.Body>
    //                 Some text as placeholder. In real life you can have the elements you
    //                 have chosen. Like, text, images, lists, etc.
    //             </Offcanvas.Body>
    //         </Offcanvas>
    //     </>
    // )

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
            <Navbar className='navbars border rounded px-0' expand="lg" style={{ backgroundColor: "#FFD4D4" }}>
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
                                <RiAdminFill />
                                ADMIN
                            </Col>
                        </Row>
                    </Container>
                </Navbar.Brand>
                <Col >
                    <Nav className='justify-content-end align-content-end align-items-end text-end '>
                        <Button variant='outline-secondary' className='border border-secondary rounded p-2 m-2' onClick={handleShow}>
                                <MdExpandMore fontSize={"2.5em"}/>
                        </Button>
                    </Nav>
                </Col>
                {/* <Container style={{ border: "black solid" }}>
                    <Row >
                    </Row>
                </Container> */}
            </Navbar >

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Container>
                        <Row className='text-center'>
                            <Offcanvas.Title>
                                <h1 style={{ fontSize: "calc(1em + 1vw)" }}>

                                    ADMIN
                                </h1>
                            </Offcanvas.Title>
                        </Row>
                    </Container>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container className='align-content-center justify-content-center text-center'>
                        <Row>
                            <Button variant='secondary' onClick={handleClose} as={Link} to="/account" className='mx-auto m-1' >
                                <MdOutlineContacts />
                                ACCOUNTS
                            </Button>
                        </Row>
                        <Row>
                            <Button variant='secondary' onClick={handleClose} as={Link} to="/orders" className='mx-auto m-1'>
                                <AiOutlineUnorderedList />
                                ORDERS INFO
                            </Button>
                        </Row>
                        <Row>
                            <Button variant='secondary' onClick={handleClose} as={Link} to="/products" className='mx-auto m-1'>
                                <GiClothes />
                                PRODUCTS INFO
                            </Button>
                        </Row>
                        <Row>
                            <Button variant='secondary' onClick={handleClose} as={Link} to="/services" className='mx-auto m-1'>
                                <GiRolledCloth />
                                SERVICES INFO
                            </Button>
                        </Row>
                        <Row>
                            <Button variant='secondary' onClick={handleClose} as={Link} to="/shops" className='mx-auto m-1'>
                                <FaStoreAlt />
                                SHOPS INFO
                            </Button>
                        </Row>
                        <Row>
                            <Button variant='secondary' onClick={handleClose} as={Link} to="/tailors" className='mx-auto m-1'>
                                <MdOutlineContacts />
                                TAILORS INFO
                            </Button>
                        </Row>
                        <Row>
                            <Button variant='secondary' onClick={handleClose} as={Link} to="/complaints" className='mx-auto m-1'>
                                <BiMessageRoundedX />
                                COMPLAINTS
                            </Button>
                        </Row>
                        <Row>
                            <Button variant='secondary' onClick={handleClose} as={Link} to="/activation-requests" className='mx-auto m-1'>
                                <AiFillUnlock />
                                ACTIVATION REQUESTS
                            </Button>
                        </Row>
                        <Row>
                            <Button variant='secondary' onClick={handleClose} as={Link} to="/utilities" className='mx-auto m-1'>
                                <FaTools />
                                UTILITIES
                            </Button>
                        </Row>
                        <Row>
                            <Button variant='danger' onClick={() => handle_logout()} className='mx-auto my-5'>
                                <RiLogoutBoxRFill />
                                LOGOUT
                            </Button>
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>

    )
}

export default NavBarAdmin