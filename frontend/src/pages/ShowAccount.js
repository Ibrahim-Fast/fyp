import React, { useContext, useEffect, useState } from 'react'
import { Spinner, Button, Card, Col, Container, Row, Badge, Image, Form, InputGroup } from 'react-bootstrap';
import useAxiosPrivate from '../api/useAxiosPrivate'
import { UserState } from '../context/UserState'
import { Link, Navigate } from 'react-router-dom';


const ShowAccount = () => {
    const { user_state } = useContext(UserState)

    const axiosPrivate = useAxiosPrivate()
    const [responseState, set_responseState] = useState({})
    const [address, set_address] = useState('')
    const [hide, set_hide] = useState(true)
    const [isloading, set_isloading] = useState(true)
    const [button_load, set_button_load] = useState(false)

    const save_address = async () => {
        if (user_state !== 'customer') {
            return
        }
        try {
            const response = await axiosPrivate.put(
                `/api/customer/address`, { address: address }
            )
            set_hide(true)
            console.log(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const controller = new AbortController()
        set_isloading(true)
        const get_info = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/api/${user_state}`,
                    {
                        signal: controller.signal
                    })
                set_responseState(response.data)
                set_address(response.data.address)
                console.log(response.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        get_info()
        set_isloading(false)
        return () => {
            controller.abort()
        }
    }, [])

    return (
        <Container className='align-content-center justify-content-center my-2'>
            {!(user_state === 'admin' || user_state === 'tailor' || user_state === 'customer') ? <>
                <Navigate to='/' replace />
            </> : <></>}
            <Row>
                <Col>
                    {(responseState && responseState.first_name) ?
                        <Card className='m-3 p-3'>
                            <Card.Header className='text-center '>
                                <h1>
                                    ACCOUNT INFO
                                </h1>
                            </Card.Header>
                            <Container
                                style={{ minHeight: "180px", maxHeight: "180px", width: '180px', overflow: 'hidden', position: 'relative' }}>
                                <Row >
                                    <Col>
                                        <Image src={responseState.profile_picture} className='img-fluid' alt="thumbnail" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: 'contain', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                                    </Col>
                                </Row>
                            </Container>
                            <Container className='text-center'>
                                <Row>
                                    <Card.Body>
                                        <Card.Title>{responseState.first_name + ' ' + responseState.last_name}</Card.Title>
                                        <Card.Text>
                                            {'Email: ' + responseState.email}
                                        </Card.Text>
                                        <Card.Text>
                                            {'Mobile: ' + responseState.mobile}
                                        </Card.Text>
                                        <Card.Text>
                                            {'Joined: ' + responseState.createdAt.split('T')[0]}
                                        </Card.Text>
                                        {(user_state === 'customer') ?
                                            <Row className='text-center justify-content-center align-content-center align-items-center'>
                                                <Col xs={2}>
                                                    <Form.Label>Address</Form.Label>
                                                </Col>
                                                <Col xs={4}>
                                                    <InputGroup>
                                                        <Form.Control value={address} onChange={(e) => {
                                                            set_address(e.target.value)
                                                            set_hide(false)
                                                        }} />
                                                        <Button hidden={(address === responseState.address || hide)} variant='success' onClick={() => { save_address() }} className='rounded'>Set Address</Button>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            : ''}
                                        <br />
                                        <Button variant="outline-success" as={Link} to='edit'>Edit Info</Button>
                                    </Card.Body>
                                </Row>
                            </Container>
                        </Card>
                        : "It seems the request Failed please Reload this Page"}
                </Col>
            </Row>
        </Container >
    )
}

export default ShowAccount










