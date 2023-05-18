import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../api/useAxiosPrivate'
import Modal from 'react-bootstrap/Modal';
import { Badge, Button, Card, Carousel, Col, Container, ProgressBar, Row, Table } from 'react-bootstrap'
import ImageSrc from '../ImageSrc'

const SingleProduct = () => {
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
                const da_response = await axiosPrivate.get(`/api/tailor/${shop_id}/product/pi/${id}`)
                setresponse(da_response.data)
                console.log(response)
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
    const get_product_options = (values_array) => {
        const methods = (n) => {
            switch (n) {
                case 1:
                    {
                        return 'Product is Negotiable'
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
                    <Button variant='danger' onClick={() => set_delete_modal(true)}>Remove Product</Button>
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
                            <Modal.Title>Remove Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are You Sure About Removing This Product
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => set_delete_modal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger">Yes Remove this product</Button>
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
                                            PRODUCT INFORMATION
                                        </h1>
                                    </Card.Header>
                                    <Container fluid className='justify-content-center text-center'>
                                        <Row>
                                            <Col>
                                                <h3>
                                                    PRODUCT IMAGES
                                                </h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                {/* <ImageSrc url={response.shop_pictures[0]} instyle={{ 'width': "80vw" }} /> */}
                                                <Carousel slide interval={3000} variant='dark' style={{ minHeight: "30vh", maxHeight: "auto" }}>
                                                    {
                                                        response.product_images.map((i, n) => {
                                                            return (
                                                                <Carousel.Item key={n}>
                                                                    {/* <ImageSrc url={i} instyle={{ 'width': "auto", 'minHeight': '40vh', 'maxHeight': '70vh' }} /> */}
                                                                    <ImageSrc url={i} instyle={{ 'maxWidth': "100%", 'minHeight': '10vh', 'maxHeight': '50%', "objectFit": "contain" }} />

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
                                            {"PRODUCT NAME: "}
                                            {response.product_name}</Card.Title>
                                        <Card.Subtitle>
                                            {"PRICE: "}
                                            {response.product_price}RS
                                            {' | Discount: '}

                                            {response.discount}%
                                            {' | Price after Discount: '}

                                            {response.product_price - (response.product_price * (response.discount / 100))}RS
                                        </Card.Subtitle>
                                        <hr />
                                        <br />
                                        <Card.Text>
                                            {"Description: "}
                                            {response.product_description}
                                        </Card.Text>

                                        {response.ordering_methods.includes(2) ? <>
                                            <Card.Text>
                                                {"Price For Bulk purchase(per item): " + response.bulk_product_price + "RS"}
                                            </Card.Text>
                                            <Card.Text>
                                                {"Minimum Items for bulk purchase: " + response.bulk_minimum_items+' items'}
                                            </Card.Text>
                                        </>
                                            : <></>}
                                        {response.product_options.includes(2) ? <>
                                            <Card.Text>
                                                {"Stock Left: " + response.stock_amount + ' '}
                                                {(response.stock_amount >= 1) ?
                                                    <Badge bg='success'>Stock Available</Badge> : <Badge bg='danger'>Out of Stock</Badge>}
                                            </Card.Text>
                                            <Card.Text>
                                                {"Minimum Items for bulk purchase: " + response.bulk_minimum_items}
                                            </Card.Text>
                                        </>
                                            : <></>}

                                        <Card.Text>
                                            PRODUCT OPTIONS:
                                            {get_product_options(response.product_options)
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
                                            Product Visibility:
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
                                        PRODUCT CATEGORIES:
                                        {(response.product_categories) ?
                                            <Table striped bordered hover responsive size='sm'>
                                                <thead>
                                                    <tr>
                                                        <th>Category</th>
                                                        <th>Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Gender</td>
                                                        <td>{response.product_categories.gender}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Age Group</td>
                                                        <td>{response.product_categories.age_group}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Article Type</td>
                                                        <td>{response.product_categories.article_type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Season</td>
                                                        <td>{response.product_categories.season}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Wear Type</td>
                                                        <td>{response.product_categories.wear_type}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Other Search Tags</td>
                                                        <td>{(response.product_categories.other_tags && response.product_categories.other_tags.length > 0) ?
                                                            <>
                                                                {'|'}
                                                                {response.product_categories.other_tags.map(elem => {
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
                                            Product Added:
                                            <b>
                                                {response.createdAt.split('T')[0]}
                                            </b>
                                        </Card.Text>

                                        <Card.Footer>
                                            <Container className='justify-content-center text-center'>
                                                <Row>
                                                    <Col xs={12} sm={true} className='my-2'>
                                                        <Button variant="warning" as={Link} to={`/products/edit/${shop_id}/${id}`}>
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
                                                            <Button variant="danger" as={Link} to={`/shops/request-activation/${id}`}>REQUEST PRODUCT ACTIVATION</Button>
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

export default SingleProduct