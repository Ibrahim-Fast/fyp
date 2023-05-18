
import React, { useEffect, useRef, useState } from 'react'
import { Spinner, Button, Card, Col, Container, Row, Badge, CardImg, Image } from 'react-bootstrap';
import useAxiosPrivate from '../../../api/useAxiosPrivate'
import { Link } from 'react-router-dom';

const MyProducts = () => {
    const axiosPrivate = useAxiosPrivate()
    const [responseState, set_responseState] = useState({})
    const [isloading, set_isloading] = useState(true)
    const [current_page, set_current_page] = useState(1)

    const [button_load, set_button_load] = useState(false)

    const show_func = async (n) => {
        let pn = current_page
        if (n > 0) {
            pn = current_page + 1
        } else {
            pn = current_page - 1
        }
        set_current_page(pn)
        set_button_load(true)
        const get_info = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/api/tailor/shop/${pn}`)
                // set_responseState(JSON.parse(JSON.stringify(response.data)))
                console.log(response)
                set_responseState(response.data)
            }
            catch (err) {
                console.log(err)
            } finally {
                set_button_load(false)
            }
        }
        get_info()
        set_isloading(false)
    }
    useEffect(() => {
        const controller = new AbortController()
        set_isloading(true)
        const get_info = async () => {
            try {
                const response = await axiosPrivate.get(
                    '/api/tailor/product',
                    {
                        signal: controller.signal
                    })
                // set_responseState(JSON.parse(JSON.stringify(response.data)))
                set_responseState(response.data)
                // console.log(response.data)
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
            <Row>
                <Col>
                    <h1>
                        My Products
                    </h1>
                </Col>
            </Row>
            {(isloading) ?
                <>
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                </> : <></>}
            <Row className='justify-content-between align-content-center'>
                {(responseState === undefined || responseState.results === undefined || responseState.results.length === 0) ? <>
                    <h1>
                        ..Currently No Products to Show goto shop and add product or reload..
                    </h1>
                </>
                    : responseState.results.map((i, n) => {
                        return (
                            <Col className='mx-auto' key={n} md={12} lg={6} xxl={4} >
                                <Card key={i._id} className='my-2'  >
                                    <Card.Body as={Link} to={`/products/${i.shop_id}/${i._id}`}>
                                        <Container >
                                            <Row className='text-center justify-content-center align-content-center'>
                                                {
                                                    // (i.product_images && i.product_images.length > 0) ?
                                                    //     <ImageSrc url={i.product_images[0]} instyle={{ minHeight: "30vh", maxHeight: "70vh", width: "auto" }} /> : ""
                                                    (i.thumbnail) ?
                                                        <Image src={i.thumbnail} alt="thumbnail" /> : ""

                                                }
                                            </Row>
                                            <Row>
                                                <Col className='justify-content-end align-content-end text-end'>
                                                    <Badge bg='success' >{(n + 1) + ((current_page - 1) * 10)}</Badge>
                                                </Col>
                                                <Col xs={12}>
                                                    <Card.Title>
                                                        <b>
                                                            {'Product Name: '}
                                                        </b>
                                                        {i.product_name}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        <b>
                                                            {'Product Price: '}
                                                        </b>
                                                        {i.product_price}
                                                        RS
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <b>
                                                            {'Product Discount: '}
                                                        </b>
                                                        {(i.discount === 0) ? "No Discount Set" :
                                                            i.discount}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <b>
                                                            {'Current Visibility: '}
                                                        </b>
                                                        {(i.visibility === 1) ?
                                                            <Badge bg="info">VISIBLE</Badge> :
                                                            <Badge bg="danger">NOT SET AS VISIBLE</Badge>
                                                        }
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <b>
                                                            {'Product Made On: '}
                                                        </b>
                                                        {i.createdAt}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <b>
                                                            {'Product Category: '}
                                                        </b>
                                                        {'| ' + i.product_categories.age_group + ' '}
                                                        {'| ' + i.product_categories.gender + ' '}
                                                        {'| ' + i.product_categories.article_type + ' '}
                                                        {'| ' + i.product_categories.season + ' '}
                                                        {'| ' + i.product_categories.wear_type}
                                                        {' |'}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        <b>
                                                            {'Other Tags: '}
                                                        </b>
                                                        {(i.product_categories.other_tags.length > 0) ? i.product_categories.other_tags.map(e => {
                                                            return e + ', '
                                                        }) : "None Provided"}

                                                    </Card.Text>

                                                    <Card.Text className='text-center'>
                                                    </Card.Text>
                                                </Col>
                                            </Row>
                                            <br />
                                            <Card.Subtitle className='text-center'>Click Card to see more Product Detail</Card.Subtitle>
                                        </Container>
                                    </Card.Body>
                                    {(i.status === 1) ?
                                        <Badge bg="success">Activated</Badge> :
                                        <Badge bg="danger">Not Activated</Badge>
                                    }
                                    <Button variant='outline-info' as={Link} to={`/shops/${i.shop_id}`}>
                                        GO TO PRODUCT SHOP
                                    </Button>
                                </Card>

                            </Col>
                        )
                    })}

            </Row>

            <Row>
                {/* {console.log(responseState)} */}
                <Col className='text-center'>
                    {(responseState && responseState.of && responseState.current) ?
                        <>
                            Showing {responseState.current} of {responseState.of} results
                            <br />
                            {(responseState.previous === true) ?
                                <Button disabled={button_load} variant='secondary' className='my-2' onClick={() => {
                                    show_func(-1)
                                }}>Show Previous</Button>
                                : ""
                            }
                            {(responseState.next === true) ?
                                <Button disabled={button_load} variant='secondary' className='my-2' onClick={() => {
                                    show_func(+1)
                                }}>Show Next</Button>
                                : ""
                            }
                        </>
                        : ""}
                </Col>
            </Row>
        </Container >
    )
}

export default MyProducts