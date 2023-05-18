import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserState } from '../../context/UserState'
import Toast from 'react-bootstrap/Toast';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import { Container, InputGroup } from 'react-bootstrap';

const LOGIN_URL = '/login/customer'

const CustomerLogin = () => {
  const { user_state, set_user_state, rt, set_rt, at, set_at, set_cart } = useContext(UserState)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error_msg, seterror_msg] = useState("")
  const [showtoast, setShowtoast] = useState(false);

  const [show, setShow] = useState(false);
  const user = useRef()
  useEffect(() => {
    seterror_msg('')
    setShowtoast(false)
  }, [email, password])

  const handle_click = async (e) => {
    setShowtoast(false)
    e.preventDefault()
    if (!email || !password) {
      seterror_msg(`INCOMPLETE CANNOT LOGIN, 
      Please Enter Valid Email and Password`)
      setShowtoast(!showtoast)
      return
    }
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email: email, password: password }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentidal: true
        });
      // console.log(JSON.stringify(response.data.token))
      if (response.data.token !== undefined && response.data.refresh_token !== undefined) {
        set_user_state('customer')
        set_rt(response.data.refresh_token)
        set_at(response.data.token)
        set_cart([])
      } else {
        throw "server error"
      }
      setemail = '';
      setpassword = ''
      return
    }
    catch (e) {
      if (!e?.response) {
        seterror_msg("SERVER ERROR, server not responding")
        setShowtoast(!showtoast)
      }
      else if (e.response.data.error) {
        seterror_msg(e.response.data.error_msg)
        setShowtoast(!showtoast)
      }
    }
  }

  return (
    <>
      <Container >
        <Row className='m-3 p-3 justify-content-center align-content-center text-center'>
          <Col xs={12} md={6}>
            <h1>LOGIN CUSTOMER</h1>
          </Col>
        </Row>
        <Row className='m-3 p-3 justify-content-center align-content-center text-center'>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={4}>
                <Form.Label >
                  EMAIL
                </Form.Label>
              </Col>
              <Col >
                <Form.Control
                  type="email"
                  ref={user}
                  placeholder="Enter email"
                  onChange={(e) => { setemail(e.target.value) }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='m-3 p-3 justify-content-center align-content-center text-center'>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={4} >
                <Form.Label>
                  PASSWORD
                </Form.Label>
              </Col>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    type={(show === true) ? "text" : "password"}
                    onChange={(e) => { setpassword(e.target.value) }}
                    placeholder="Enter Password"
                  />
                  <Button size='sm' variant='secondary' onClick={() => setShow(p => !p)}>SHOW</Button>
                </InputGroup>

              </Col>
              <Row className='text-center justify-content-center align-content-center'>
                <Link to='/login/customer/forgot-password'>
                  FORGOT PASSWORD?
                </Link>
              </Row>
            </Row>
          </Col>
        </Row>

        <Row className='justify-content-center align-content-center text-center'>
          <Toast bg="danger" className='justify-content-center' onClose={() => setShowtoast(false)} show={showtoast} delay={10000} autohide>
            <Toast.Header>
              <strong className="me-auto">ERROR</strong>
            </Toast.Header>
            <Toast.Body>{error_msg}
              <hr />
              <small>{Date().toLocaleString()}</small>
            </Toast.Body>
          </Toast>
        </Row>

        <Row className='justify-content-center align-content-center text-center'>
          <Col>
            <Button variant="secondary" type="submit" onClick={(e) => { handle_click(e) }}>
              LOGIN
            </Button>
          </Col>
        </Row>

        <Row className='m-3 p-3 justify-content-center align-content-center text-center'>
          Dont have an account ?
          <Link to='/register/customer'>
            REGISTER HERE
          </Link>
        </Row>

      </Container>
    </>
  )
}

export default CustomerLogin