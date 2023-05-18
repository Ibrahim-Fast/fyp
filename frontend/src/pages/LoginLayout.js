import React from 'react'
import { Nav } from 'react-bootstrap';
import { Link, Navigate, Outlet } from 'react-router-dom';

function LoginLayout() {

    return (
        <>
            <Nav
                className="mb-3 my-2 mytab"
                variant="tabs"
                justify
                defaultActiveKey="customer"
            >
                <Nav.Item >
                    <Nav.Link as={Link} to='/login/tailor'>
                        TAILOR
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item key="customer">
                    <Nav.Link as={Link} to='/login/customer'>
                        CUSTOMER
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Outlet />
        </>
    )
}

export default LoginLayout