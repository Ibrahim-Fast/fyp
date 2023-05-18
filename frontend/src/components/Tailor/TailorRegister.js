import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { InputGroup, Stack } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import axios from '../../api/axios';
import Spinner from 'react-bootstrap/Spinner';

const TailorRegister = () => {

  const [show, setshow] = useState(false)
  const [email, set_email] = useState('')
  const [password, set_password] = useState('')
  const [repassword, set_repassword] = useState('')
  const [mobile, set_mobile] = useState('')
  const [first_name, set_first_name] = useState('')
  const [last_name, set_last_name] = useState('')

  const [error, set_error] = useState('')
  const [error_show, set_error_show] = useState(false)

  const [isLoading, set_isLoading] = useState(false)
  const [info, set_info] = useState('')
  const [info_show, set_info_show] = useState(false)

  const [navigate_then, set_navigate_then] = useState(false)


  useEffect(() => {
    return () => {
      set_error('')
      set_error_show(false)
    };
  }, [email, password, mobile, repassword, first_name, last_name])

  const handlesubmit = async (e) => {
    e.preventDefault()

    set_isLoading(true)
    if (!email || !password || !repassword || !mobile || !first_name || !last_name) {
      set_error('INCOMPLETE PLEASE PROVIDE COMPLETED INFORMATION')
      set_error_show(true)
      set_isLoading(false)
      return
    }

    if (password !== repassword) {
      set_error('PASSWORDS DO NOT MATCH')
      set_error_show(true)
      set_isLoading(false)
      return
    }

    try {
      const response = await axios.post('/register/tailor',
        JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          mobile: '+' + mobile
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentidal: true
        });
      if (response.data.message) {
        set_info(response.data.message)
        set_info_show(true)
      }
      // console.log(response)
      setInterval(() => {
        set_navigate_then(true)
      }, 2000);
    } catch (e) {
      console.log(e)
      if (e.response.data && e.response.data.error_msg) {
        // console.log(e.response.data)
        set_error(e.response.data.error_msg)
        set_error_show(true)
      }
    }
    set_isLoading(false)
  }
  return (
    <>
      {(navigate_then === true) ?
        <Navigate to='/login/tailor' replace /> : ""
      }
      <Container fluid="md" className='my-2 py-2'>
        <Form>
          <Row>
            <Col className='justify-content-center align-content-center text-center my-4'>
              <h1>
                REGISTERING AS TAILOR
              </h1>
            </Col>
          </Row>
          <Row >
            <Col xs={12} md={6} className='my-2'>
              <Row>
                <Col xs={4}>
                  <Form.Label >FIRST NAME</Form.Label>
                </Col>
                <Col >
                  <Form.Control value={first_name} onChange={(e) => set_first_name(e.target.value)} type="text" placeholder="ENTER FIRST NAME" required />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className='my-2'>
              <Row>
                <Col xs={4}>
                  <Form.Label >LAST NAME</Form.Label>
                </Col>
                <Col >
                  <Form.Control type="text" value={last_name} onChange={(e) => set_last_name(e.target.value)} placeholder="ENTER LAST NAME" required />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className='my-2'>
              <Row>
                <Col xs={4}>
                  <Form.Label >EMAIL</Form.Label>
                </Col>
                <Col >
                  <Form.Control type="email" value={email} onChange={(e) => set_email(e.target.value)} placeholder="ENTER EMAIL" required />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className='my-2'>
              <Row>
                <Col xs={4}>
                  <Form.Label >MOBILE NUMBER</Form.Label>
                </Col>
                <Col >
                  <InputGroup className="mb-3">
                    <InputGroup.Text>+</InputGroup.Text>
                    <Form.Control placeholder="ENTER MOBILE" required
                      value={mobile} onChange={(e) => set_mobile(e.target.value)}
                      onInput={e => { e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1') }} />
                  </InputGroup>
                  <Form.Text>
                    Make sure to account for country calling code and i.e write 0332 as +92332 (0 is replaced with +92, as it is code for Pakistan to know your area code
                    <Link to='https://en.wikipedia.org/wiki/List_of_country_calling_codes' target="_blank"> click here</Link>)
                  </Form.Text>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className='my-2'>
              <Row>
                <Col xs={4}>
                  <Form.Label >PASSWORD</Form.Label>
                </Col>
                <Col>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="ENTER PASSWORD" required
                      type={(!show) ? 'password' : 'text'}
                      value={password} onChange={(e) => set_password(e.target.value)}
                    />
                    <Button variant='secondary' onClick={() => setshow(p => !p)}>SHOW</Button>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} className='my-2'>
              <Row>
                <Col xs={4}>
                  <Form.Label > RE-ENTER PASSWORD</Form.Label>
                </Col>
                <Col >
                  <Form.Control type={(!show) ? 'password' : 'text'} placeholder="RE-ENTER PASSWORD" required
                    value={repassword} onChange={(e) => set_repassword(e.target.value)} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='mx-5 px-5 py-2 my-2 align-content-center justify-content-center text-center'>
            <Toast bg='danger' show={error_show} onClose={() => {
              set_error('')
              set_error_show(false)
            }}>
              <Toast.Header >
                <strong className="me-auto">ERROR</strong>
              </Toast.Header>
              <Toast.Body>{error}</Toast.Body>
            </Toast>

            <Toast bg='success' show={info_show} onClose={() => {
              set_info('')
              set_info_show(false)
            }}>
              <Toast.Header >
                <strong className="me-auto">SUCCESS</strong>
              </Toast.Header>
              <Toast.Body>{info}</Toast.Body>
            </Toast>
          </Row>
          <Row className='align-content-center justify-content-center text-center mx-5 px-5 py-2 my-2'>
            {(isLoading === true) ?
              <Button variant='secondary' type='submit' onClick={(e) => handlesubmit(e)}>
                <Spinner animation="grow" size='sm' />
                REGISTER
                <Spinner animation="grow" size='sm' />
              </Button> :
              <Button variant='secondary' type='submit' onClick={(e) => handlesubmit(e)}>
                REGISTER
              </Button>
            }
          </Row>
          <Row className='align-content-center justify-content-center text-center mx-5 px-5 py-2 my-2'>
            Already Have an Account
            <Link to={'/login/tailor'}>
              LOGIN HERE
            </Link>
          </Row>
        </Form>

      </Container >

    </>
  )
}

export default TailorRegister