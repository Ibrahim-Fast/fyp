import React, { useContext, useEffect, useState } from 'react'
import { Spinner, Button, Card, Col, Container, Row, Badge, Image, Toast, Table } from 'react-bootstrap';

import { Link, Navigate } from 'react-router-dom';
import useAxiosPrivate from '../../api/useAxiosPrivate';


const MyPortfolio = () => {
    const axiosPrivate = useAxiosPrivate()
    const [responseState, set_responseState] = useState({})
    const [isloading, set_isloading] = useState(true)
    const [button_load, set_button_load] = useState(false)
    const [page_error, set_page_error] = useState("")
    const [error_show, set_error_show] = useState(false)
    const [navigate_create, set_navigate_create] = useState(false)


    useEffect(() => {
        const controller = new AbortController()
        set_isloading(true)
        const get_info = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/api/tailor/portfolio`,
                    {
                        signal: controller.signal
                    })
                set_responseState(response.data)
                // console.log(response.data)
            }
            catch (err) {
                if (err.message && err.message === 'canceled') {
                    return
                }
                console.log(err)
                if (err.response && err.response.data && err.response.data.error_msg) {
                    set_page_error(err.response.data.error_msg)
                    if (err.response.status === 404) {
                        setInterval(() => {
                            set_navigate_create(true)
                        }, 2000);
                    }

                } else {
                    set_page_error('please reload')
                }
                set_error_show(true)
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
            {(isloading) ?
                <>
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                </> : <></>}

            {(navigate_create === true) ? <Navigate to='create' /> : ""}
            <Row>
                <Col>
                    {(responseState && responseState.tailor_id && responseState.tailor_id.first_name) ?
                        <Card className='m-3 p-3'>
                            <Card.Header className='text-center '>
                                <h1>
                                    {responseState.tailor_id.first_name.toUpperCase() + ' ' + responseState.tailor_id.last_name.toUpperCase() + '\'s'} PORTFOLIO
                                </h1>
                            </Card.Header>
                            <Container
                            className='my-3'
                                style={{ minHeight: "180px", maxHeight: "180px", width: '180px', overflow: 'hidden', position: 'relative' }}>
                                <Row >
                                    <Col>
                                        <Image src={responseState.tailor_id.profile_picture} className='img-fluid' alt="thumbnail" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: 'contain', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                                    </Col>
                                </Row>
                            </Container>
                            <Container className='text-center'>
                                <Row>
                                    <Card.Body>
                                        <Card.Title>{responseState.tailor_id.first_name + ' ' + responseState.tailor_id.last_name}</Card.Title>
                                        <Card.Text>
                                            {'Description: '}{(responseState.description === '') ? 'None Given' : responseState.description}
                                        </Card.Text>
                                        <Card.Text>
                                            {'Email: ' + responseState.tailor_id.email}
                                        </Card.Text>
                                        <Card.Text>
                                            {'Mobile: ' + responseState.tailor_id.mobile}
                                        </Card.Text>
                                        <Card.Text>
                                            {'City: ' + responseState.city}
                                        </Card.Text>
                                        <Card.Text>
                                            Visibility
                                            {(responseState.visibility === 1) ?
                                                <Badge className='mx-2' bg='success'>
                                                    VISIBLE
                                                </Badge>
                                                :
                                                <Badge className='mx-2' bg='danger'>
                                                    NOT VISISBLE
                                                </Badge>
                                            }
                                        </Card.Text>
                                        <h1>
                                            {'Other Contacts '}
                                        </h1>
                                        {(responseState.other_contacts.length === 0) ? "None Given" :
                                            <Table responsive striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Description
                                                        </td>
                                                        <td>
                                                            Number
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {responseState.other_contacts.map((i, n) => {
                                                        return (<tr key={n}>
                                                            <td>{n + 1}</td>
                                                            <td>
                                                                {i.description}
                                                            </td>
                                                            <td>
                                                                {i.contact_number}
                                                            </td>
                                                        </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        }
                                        <h1>
                                            {'Related Works '}
                                        </h1>
                                        <Card.Text>

                                            {(responseState.related_works.length === 0) ? "None Given" : responseState.responseState.related_works}
                                        </Card.Text>
                                        <h1>
                                            {'Search Tags'}
                                        </h1>
                                        <Card.Text>
                                            {(responseState.search_tags.length === 0) ? "None Given" :
                                                <>
                                                    {responseState.search_tags.map((i, n) => {
                                                        return (
                                                            <React.Fragment key={n}>
                                                                {"| " + i + ' '}
                                                            </React.Fragment>
                                                        )
                                                    })
                                                    }
                                                    {" |"}
                                                </>
                                            }
                                        </Card.Text>
                                        <h1>
                                            {'Social Media Links '}
                                        </h1>
                                        {(responseState.social_media_links.length === 0) ? "None Given" :

                                            <Table responsive striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <td></td>
                                                        <td>
                                                            Platform
                                                        </td>
                                                        <td>
                                                            url
                                                        </td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {responseState.social_media_links.map((i, n) => {
                                                        return (<tr key={n}>
                                                            <td>{n + 1}</td>
                                                            <td>
                                                                {i.platform_name}
                                                            </td>
                                                            <td>
                                                                <a href={
                                                                    (i.url.includes('http') ? i.url : 'http://' + i.url)} target="_blank">{i.url}</a>
                                                            </td>
                                                        </tr>)
                                                    })}
                                                </tbody>
                                            </Table>
                                        }



                                        <Button variant="outline-success" as={Link} to='edit'>Edit Info</Button>
                                    </Card.Body>
                                </Row>
                            </Container>
                        </Card>
                        : (error_show === true) ? < Row >
                            <Col md='auto' className='text-center justify-content-center mx-auto'>
                                <Toast bg='danger' onClose={() => set_error_show(false)} show={error_show} >
                                    <Toast.Header>
                                        <strong className="me-auto">FORM ERROR</strong>
                                    </Toast.Header>
                                    <Toast.Body>{page_error}</Toast.Body>
                                </Toast>
                            </Col>
                        </Row>
                            : "It seems the request Failed please Reload this Page"}
                </Col>
            </Row >
        </Container >
    )
}

export default MyPortfolio










