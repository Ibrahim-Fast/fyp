import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../api/useAxiosPrivate'
import Modal from 'react-bootstrap/Modal';
import { Badge, Button, Card, Carousel, Col, Container, ProgressBar, Row, Table } from 'react-bootstrap'
import ImageSrc from '../ImageSrc'

const SingleService = () => {
    const { shop_id, id } = useParams()
    const [refresh, setrefresh] = useState(true)
    const [ifError, setifError] = useState(false)
    const [error_msg, seterror_msg] = useState()
    const [response, setresponse] = useState('')
    const [delete_modal, set_delete_modal] = useState(false)
    const axiosPrivate = useAxiosPrivate()
    useEffect(() => {
        const f = async () => {
            try {
                const da_response = await axiosPrivate.get(`/api/tailor/${shop_id}/service/si/${id}`)
                console.log(da_response)
                setresponse(da_response.data)
            } catch (e) {
                setifError(true)
                if (e.response.data.error_msg) {
                    seterror_msg(e.response.data.error_msg)
                }
                console.log(e)
            }

        }
        f()
        return () => {
        }
    }, [refresh])

    const get_ordering_methods = (values_array) => {
        const methods = (n) => {
            switch (n) {
                case 1:
                    {
                        return 'Simple Ordering'
                    }
                case 2: {
                    return 'Bulk Scheduled Ordering'
                }
                default: {
                    return 'undefined'
                }
            }

        }

        if (values_array.length === 0) {
            return "None"

        }

        let return_string = ' | '
        values_array.forEach(element => {
            return_string = return_string + methods(element) + ' | '
        });
        return return_string
    }
    const get_payment_methods = (values_array) => {
        const methods = (n) => {
            switch (n) {
                case 1:
                    {
                        return 'CASH ON DELIVERY FULL END'
                    }
                case 2: {
                    return '30% ADVANCE CASH'
                }
                case 3: {
                    return '100% ADVANCE ONLINE	'
                }
                default: {
                    return 'undefined'
                }
            }

        }

        if (values_array.length === 0) {
            return "None"

        }

        let return_string = ' | '
        values_array.forEach(element => {
            return_string = return_string + methods(element) + ' | '
        });
        return return_string
    }
    const get_service_options = (values_array) => {
        const methods = (n) => {
            switch (n) {
                case 1:
                    {
                        return 'service is Negotiable'
                    }
                case 2: {
                    return 'Stock Based Ordering'
                }
                default: {
                    return 'undefined'
                }
            }

        }

        if (values_array.length === 0) {
            return "None"

        }

        let return_string = ' | '
        values_array.forEach(element => {
            return_string = return_string + methods(element) + ' | '
        });
        return return_string
    }


    return (
        <Container className='my-3 py-3' >

            <Row className='justify-content-evenly my-3'>
                <Col className='mx-auto'>
                    <Button variant='danger' onClick={() => set_delete_modal(true)}>Remove service</Button>
                </Col>
                <Col className='d-flex flex-row-reverse'>
                    <Button variant='info' onClick={() => setrefresh(Prev => !Prev)}>Refresh</Button>
                </Col>
            </Row>
            <Row className='justify-content-evenly my-3'>
                <Col className='mx-auto'>
                    <Modal
                        show={delete_modal}
                        onHide={() => set_delete_modal(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Remove service</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are You Sure About Removing This service
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => set_delete_modal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger">Yes Remove this service</Button>
                        </Modal.Footer>
                    </Modal>

                </Col>
            </Row>
            <Row>
                <Col>
                    {(ifError === true) ?
                        <>
                            {!(error_msg) ?
                                "" : error_msg}
                        </>
                        : <>
                            {(!response || response === '') ? "Could not Process Response Please reload" :
                                <Card >
                                    <Card.Header className='text-center'>
                                        <h1>
                                            SERVICE INFORMATION
                                        </h1>
                                    </Card.Header>
                                    <Container fluid className='justify-content-center text-center'>
                                        <Row>
                                            <Col>
                                                <h3>
                                                    SERVICE IMAGES
                                                </h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {/* <ImageSrc url={response.shop_pictures[0]} instyle={{ 'width': "80vw" }} /> */}
                                                <Carousel slide interval={3000} variant='dark' style={{ minHeight: "30vh", maxHeight: "auto" }}>
                                                    {
                                                        response.service_images.map((i, n) => {
                                                            return (
                                                                <Carousel.Item key={n}>
                                                                    {/* <ImageSrc url={i} instyle={{ 'width': "auto", 'minHeight': '40vh', 'maxHeight': '70vh' }} /> */}
                                                                    <ImageSrc url={i} instyle={{ 'maxWidth': "100%", 'minHeight': '10vh','maxHeight': '50%', "objectFit": "contain" }} />

                                                                </Carousel.Item>
                                                            )
                                                        })
                                                    }
                                                </Carousel>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Card.Body>
                                        <Card.Title>
                                            {"SERVICE NAME: "}
                                            {response.service_name}</Card.Title>
                                        <Card.Subtitle>
                                            {"PRICE: "}
                                            {response.service_price}RS
                                            {' | Discount: '}

                                            {response.discount}%
                                            {' | Price after Discount: '}

                                            {response.service_price - (response.service_price * (response.discount / 100))}RS
                                        </Card.Subtitle>
                                        <Card.Text>
                                            {"Description: "}
                                            {response.service_description}
                                        </Card.Text>
                                        <Card.Text>
                                            SERVICE OPTIONS:
                                            {get_service_options(response.service_options)
                                            }
                                        </Card.Text>
                                        <Card.Text>
                                            ALLOWED ORDERING METHODS:
                                            {get_ordering_methods(response.ordering_methods)
                                            }
                                        </Card.Text>
                                        <Card.Text>
                                            ALLOWED PAYMENT METHODS:
                                            {get_payment_methods(response.payment_methods)
                                            }
                                        </Card.Text>
                                        <Card.Text>
                                            SERVICE Visibility:
                                            {(response.visibility === 1) ?
                                                <Badge className='mx-2' bg='success'>
                                                    VISIBLE
                                                </Badge>
                                                :
                                                <Badge className='mx-2' bg='danger'>
                                                    NOT VISISBLE
                                                </Badge>

                                            }
                                        </Card.Text>
                                        SERVICE CATEGORIES:
                                        {(response.service_categories) ?
                                            <Table striped bordered hover responsive size='sm'>
                                                <thead>
                                                    <tr>
                                                        <th>Category</th>
                                                        <th>Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Service Type</td>
                                                        <td>{response.service_categories.service_type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Gender</td>
                                                        <td>{response.service_categories.gender}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Age Group</td>
                                                        <td>{response.service_categories.age_group}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Season</td>
                                                        <td>{response.service_categories.season}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Other Search Tags</td>
                                                        <td>{(response.service_categories.other_tags && response.service_categories.other_tags.length > 0) ?
                                                            <>
                                                                {'|'}
                                                                {response.service_categories.other_tags.map(elem => {
                                                                    return ' ' + elem + ' |'
                                                                })}
                                                            </>
                                                            : "None"}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>

                                            : "None"
                                        }


                                        <Card.Text>
                                            service Added:
                                            <b>
                                                {response.createdAt.split('T')[0]}
                                            </b>
                                        </Card.Text>

                                        <Card.Footer>
                                            <Container className='justify-content-center text-center'>
                                                <Row>
                                                    <Col xs={12} sm={true} className='my-2'>
                                                        <Button variant="warning" as={Link} to={`/services/edit/${shop_id}/${id}`}>
                                                            EDIT INFO
                                                        </Button>
                                                    </Col>
                                                    <Col xs={12} sm={true} className='my-2'>
                                                        <Button variant="outline-success" as={Link} to={`/shops/${shop_id}`}>
                                                            Go to Shop
                                                        </Button>
                                                    </Col>
                                                    {(response.status === 0) ?
                                                        <Col xs={12} sm={true} className='my-2'>
                                                            <Button variant="danger" as={Link} to={`/shops/request-activation/${id}`}>REQUEST SERVICE ACTIVATION</Button>
                                                        </Col>
                                                        :
                                                        <></>
                                                    }
                                                </Row>
                                            </Container>
                                        </Card.Footer>
                                        {(response.status === 0) ?
                                            < ProgressBar variant="danger" now={100} animated label={"CURRENT STATUS : INACTIVE"} /> :
                                            < ProgressBar variant="success" now={100} animated label={"CURRENT STATUS : ACTIVE"} />
                                        }
                                    </Card.Body>
                                </Card>
                            }
                        </>
                    }
                </Col>
            </Row>
        </Container >
    )
}

export default SingleService