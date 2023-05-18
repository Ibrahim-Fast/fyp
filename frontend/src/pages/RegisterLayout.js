import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CustomerRegister from '../components/Customer/CustomerRegister';
import TailorRegister from '../components/Tailor/TailorRegister';
import "../assets/main.css"
import { Nav } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';



const Register = () => {
  return (
    <>
      <Nav
        className="mb-3 my-2 mytab"
        variant="tabs"
        justify
      >
        <Nav.Item >
          <Nav.Link as={Link} to='/register/tailor'>
            TAILOR
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/register/customer'>
            CUSTOMER
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Outlet />
    </>
  )
}

export default Register
