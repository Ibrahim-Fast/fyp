import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiSewingNeedle } from 'react-icons/gi';
import { HiOutlinePhone } from 'react-icons/hi'
import { BsFillQuestionDiamondFill } from 'react-icons/bs'
import { AiOutlineCoffee } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
      <Navbar expand="lg" variant='light' className='navbars' style={{ backgroundColor: "#AACB73" }}>
        <Container className='justify-content-around text-center'>
          <Row>
            <Col className='mx-3'>
              <Navbar.Brand className='mx-auto' as={Link} to="/"><GiSewingNeedle />
                <b>
                  ALL IN ONE TAILOR
                </b>
              </Navbar.Brand>
            </Col>
          </Row>
          <Row>
            <Col className='mx-3'>
              <Nav.Link as={Link} to="/about-us" className="mx-auto"><b><AiOutlineCoffee />ABOUT US</b></Nav.Link>
            </Col>
          </Row>
          <Row>
            <Col className='mx-3'>

              <Nav.Link as={Link} to="/contact-us" className="mx-auto"><b><HiOutlinePhone />CONTACT US</b></Nav.Link>
            </Col>
          </Row>
          <Row>
            <Col className='mx-3'>
              <Nav.Link as={Link} to="/faqs" className="mx-auto"><b><BsFillQuestionDiamondFill />FAQs</b></Nav.Link>
            </Col>
          </Row>
        </Container >
      </Navbar>
    </>
  )
}

export default Footer