import React, { useContext, useState } from 'react'
import { UserState } from '../../context/UserState'
import { Toast, Badge, Button, Card, Col, Collapse, Container, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap'
import useAxiosPrivate from '../../api/useAxiosPrivate'
import { Link, Navigate } from 'react-router-dom'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";

import { useStripe, useElements } from '@stripe/react-stripe-js'


const OnlineModal = (props) => {
    const axiosPrivate = useAxiosPrivate()

    const stripe = useStripe();
    const elements = useElements();

    const { cart, set_cart } = useContext(UserState)

    const [loading, set_loading] = useState(false)
    const [error, set_error] = useState(false)
    const [error_msg, set_error_msg] = useState('')

    const confirm_online_payment = async () => {
        set_loading(true)
        try {
            const confirmPayment = await stripe.confirmCardPayment(
                props.client_secret,
                {
                    payment_method: {
                        card: elements.getElement(CardNumberElement)
                    },
                }
            );

            if (confirmPayment.error) {
                throw confirmPayment.error
            }

            console.log('reached here', confirmPayment)
            if (confirmPayment.paymentIntent) {

                let orders_1 = {}
                let orders_2 = {}
                let orders_3 = {}


                cart.forEach(function (item) {
                    var key_a = item.shop_id;
                    var key_b = item.order_payment_type;
                    if (item.order_payment_type === 2) {
                        if (key_a in orders_2) {
                            if (key_b in orders_2[key_a]) {
                                orders_2[key_a][key_b].push(item);
                            } else {
                                orders_2[key_a][key_b] = [item];
                            }
                        } else {
                            orders_2[key_a] = {};
                            orders_2[key_a][key_b] = [item];
                        }
                    } else if (item.order_payment_type === 1) {
                        if (key_a in orders_1) {
                            if (key_b in orders_1[key_a]) {
                                orders_1[key_a][key_b].push(item);
                            } else {
                                orders_1[key_a][key_b] = [item];
                            }
                        } else {
                            orders_1[key_a] = {};
                            orders_1[key_a][key_b] = [item];
                        }
                    } else if (item.order_payment_type === 3) {
                        if (key_a in orders_3) {
                            if (key_b in orders_3[key_a]) {
                                orders_3[key_a][key_b].push(item);
                            } else {
                                orders_3[key_a][key_b] = [item];
                            }
                        } else {
                            orders_3[key_a] = {};
                            orders_3[key_a][key_b] = [item];
                        }
                    }
                });
                // console.log(orders_2)

                const response = await axiosPrivate.post(
                    `/api/customer/orders/product/online`, { o1: orders_1, o2: orders_2, o3: orders_3, intent: confirmPayment.paymentIntent }
                )
                set_loading(false)
                if (typeof response.data.error_msg === 'undefined') {
                    props.set_submitted(true)
                    set_cart([])
                }
            }

        }
        catch (e) {
            set_error(true)
            set_loading(false)
            if (e.message) {
                set_error_msg(e.message)
            } else {
                set_error_msg('something went wrong with request')
            }
            console.log('error', e);
        }
    }
    return (
        <Modal
            show={props.online_payment_modal}
            onHide={() => props.set_online_payment_modal(false)}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>COMPLETE THE ONLINE PAYMENT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className='text-center justify-content-center align-content-center align-items-center'>
                    <Form >
                        <Row className='my-2'>
                            <Col>
                                <Form.Label>Current Billing Amount</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control readOnly value={
                                    cart.reduce((accumulator, currentValue) => {
                                        if (currentValue.order_payment_type === 2) {
                                            return accumulator + ((parseInt(currentValue.price) * 0.3) * currentValue.quantity)
                                        } else if (currentValue.order_payment_type === 3) {
                                            return accumulator + (parseInt(currentValue.price) * currentValue.quantity)
                                        }
                                        return accumulator
                                    }, 0) + ' RS'
                                } />
                                {/* <Form.Control className='p-2 m-2 ' as={CardNumberElement} /> */}
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col>
                                <Form.Label>Card Number</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control className='p-2 m-2 ' as={CardNumberElement} />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col>
                                <Form.Label>Enter Card Expiry</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control className='p-2 m-2' as={CardExpiryElement} />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col>
                                <Form.Label>Enter Card CVC</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control className='p-2 m-2' as={CardCvcElement} />
                            </Col>
                        </Row>
                        <Button variant='success' onClick={() => confirm_online_payment()}>Confirm Payment</Button>
                    </Form>
                    <Row>
                        <Col className='text-center'>
                            <Spinner size='lg' animation="border" hidden={(loading === false)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <Toast bg='danger' variant='danger' onClose={() => set_error(false)} show={error} delay={5000} autohide>
                                <Toast.Header>
                                    <strong className="me-auto">ERROR</strong>
                                </Toast.Header>
                                <Toast.Body>{error_msg}</Toast.Body>
                            </Toast>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.set_online_payment_modal(false)}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}




const Cart = () => {


    const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`);
    // console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    // const apiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

    const axiosPrivate = useAxiosPrivate()
    const { cart, set_cart } = useContext(UserState)
    const [info_modal, set_info_modal] = useState(false)
    const [submitted, set_submitted] = useState(false)
    const [is_loading, set_is_loading] = useState(false)
    const [error_modal, set_error_modal] = useState(false)
    const [show_error, set_show_error] = useState('')
    const [online_payment_modal, set_online_payment_modal] = useState(false)
    const [client_secret, set_client_secret] = useState('')
    const [card_number, set_card_number] = useState('')

    const [next, set_next] = useState(false)








    const remove_item = (n) => {
        set_cart(cart.filter((i, index) => {
            return n !== index
        }))
    }

    const send_info = async (info) => {
        try {
            const response = await axiosPrivate.post(
                `/api/customer/orders/product`, { order: info }
            )
            console.log(response)
            console.log(response.data)
            if (response.data && response.data.next && response.data.next === 1) {
                set_next(true)
                set_online_payment_modal(true)
                set_client_secret(response.data.clientSecret)
            } else {
                set_cart([])
                set_submitted(true)
            }
        } catch (e) {
            console.log(e)
            if (e.response.data.error_msg) {
                set_show_error(e.response.data.error_msg)
            } else {
                set_show_error('could not complete error at server retry')
            }
            set_error_modal(true)
            set_is_loading(false)
        }
    }

    function groupItemsByProperties(cart) {
        const groupedItems = {};

        function areItemsEqual(item1, item2) {
            const keys = Object.keys(item1);
            return keys.every(key => item1[key] === item2[key]);
        }
        cart.forEach(item => {
            const key = JSON.stringify(item);
            if (!groupedItems[key]) {
                groupedItems[key] = [];
            }

            const existingItem = groupedItems[key].find(existingItem => areItemsEqual(existingItem, item));
            if (!existingItem) {
                groupedItems[key].push(item);
            }
        });
        return groupedItems;
    }


    const checkout = async () => {
        set_is_loading(true)
        set_info_modal(true)
        let shop_sorted_array = {}
        // let shop_sorted_array = groupItemsByProperties(cart)
        cart.forEach(item => {
            const { order_payment_type, shop_id } = item;
            if (!shop_sorted_array[shop_id]) {
                shop_sorted_array[shop_id] = {};
            }
            if (!shop_sorted_array[shop_id][order_payment_type]) {
                shop_sorted_array[shop_id][order_payment_type] = [];
            }
            shop_sorted_array[shop_id][order_payment_type].push(item);
            if (!shop_sorted_array[shop_id][order_payment_type].includes(item)) {
                shop_sorted_array[shop_id][order_payment_type].push(item);
            }

        });


        console.log(shop_sorted_array)
        await send_info(shop_sorted_array)
    }




    return (
        <>
            <Container className='justify-content-center align-items-center align-content-center my-2 py-4'>
                <Card>
                    {(submitted === true) ? <Navigate to={'/orders'} replace /> : ''}
                    <Card.Header>
                        <Row>
                            <Col className='text-center'>
                                <h1>
                                    <Button variant='danger rounded-pill' onClick={() => set_cart([])}>Clear Cart</Button>
                                </h1>
                            </Col>
                            <Col className='text-center'>
                                <h1>
                                    CART
                                </h1>
                            </Col>
                            <Col className='text-center'>
                                <h3>
                                    {'ITEMS '}
                                    {(cart.length < 1) ?
                                        <Badge bg='danger rounded-pill'>Empty</Badge>
                                        : <Badge bg='success rounded-pill'>{cart.length}</Badge>
                                    }
                                </h3>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {(cart.length < 1) ?
                            <Col className='text-center'>
                                <h1>YOUR CART IS CURRENTLY EMPTY</h1>
                            </Col> :
                            <>
                                {
                                    cart.map((i, n) => {
                                        return (
                                            <Row key={n} className='p-2'>
                                                <Col >
                                                    <Card>
                                                        <Card.Header><h1>
                                                            ITEM #{n + 1}
                                                        </h1>
                                                        </Card.Header>
                                                        <Card.Body bg='success'>
                                                            <Container>
                                                                <Row>
                                                                    <Col xs={12}>
                                                                        {
                                                                            (i.product_id) ?
                                                                                <>
                                                                                    <Badge as={Link} to={`/products/view/${i.product_id}`}>
                                                                                        Product : <b>
                                                                                            {i.product_id}
                                                                                        </b>
                                                                                    </Badge>
                                                                                </> :
                                                                                (i.service_id) ?
                                                                                    <>
                                                                                        <Badge as={Link} to={`/services/view/${i.service_id}`}>
                                                                                            Service : <b>
                                                                                                {i.service_id}
                                                                                            </b>
                                                                                        </Badge>
                                                                                    </> :
                                                                                    <></>
                                                                        }
                                                                    </Col>
                                                                    <Col xs={12}>
                                                                        Item Name : <b>
                                                                            {i.name}
                                                                        </b>
                                                                    </Col>
                                                                    <Col xs={12}>
                                                                        Item Price : <b>
                                                                            {i.price}RS
                                                                        </b>
                                                                    </Col>

                                                                    {(i.order_negotiate === 0 || i.negotiation_offer === -1) ?
                                                                        <Col xs={12}>
                                                                            <h2>
                                                                                <Badge bg='info'>Simple Order</Badge>
                                                                            </h2>
                                                                        </Col>
                                                                        :
                                                                        <>
                                                                            <Col xs={12}>
                                                                                Negotiation Price Offered: <b>
                                                                                    {i.negotiation_offer}
                                                                                </b>
                                                                                <h2>
                                                                                    <Badge bg='info'>Negotiation Based Order</Badge>
                                                                                </h2>
                                                                            </Col>
                                                                        </>
                                                                    }
                                                                    {(i.urgent && i.urgent === 1) ?
                                                                        <>
                                                                            <Col xs={12}>
                                                                                <h2>
                                                                                    <Badge bg='danger'>Urgent Applied</Badge>
                                                                                </h2>
                                                                                <Form.Text>Due to urgent requirement there will be additional fees, the supplier will get back to you if urgent is possible and if it is then exta price will be added accordingly</Form.Text>
                                                                            </Col>
                                                                        </> : ''
                                                                    }

                                                                    <Col xs={12}>
                                                                        <Row>
                                                                            <Col xs={6} md={8}>
                                                                                Quantity : <b>{i.quantity}</b>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col xs={12}>
                                                                        Payment Method Selected : <b>
                                                                            {(i.order_payment_type === 1) ? "Cash On Delivery" :
                                                                                (i.order_payment_type === 2) ? "30% Advance Online" :
                                                                                    (i.order_payment_type === 3) ? "100% Advance Online" :
                                                                                        "Undefined Please remove this item as it the data has been corrupted"
                                                                            }
                                                                        </b>
                                                                    </Col>
                                                                    <Col xs={12}>
                                                                        <Badge as={Link} to={`/shops/view/${i.shop_id}`}>
                                                                            From Shop : <b>
                                                                                {i.shop_id}
                                                                            </b>
                                                                        </Badge>

                                                                    </Col>
                                                                </Row>
                                                            </Container>

                                                        </Card.Body>
                                                        <Card.Footer className='text-end'>
                                                            <Button variant='danger' className='rounded-pill' onClick={() => remove_item(n)}>Remove This Item</Button>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </>
                        }
                    </Card.Body>
                    <Row>
                        <Modal show={info_modal} onHide={() => set_info_modal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Order Placement Info</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>If you have selected different types of products having different payment methods or different products coming from different shops then orders will be separtely placed </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => {
                                    checkout()
                                    set_info_modal(false)
                                }}>
                                    Ok I Understand and Wish to Proceed
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                    <Row>
                        <Elements stripe={stripePromise} >
                            <OnlineModal client_secret={client_secret} online_payment_modal={online_payment_modal} set_online_payment_modal={set_online_payment_modal} set_submitted={set_submitted} />
                        </Elements>
                    </Row>
                    <Row>


                        <Modal show={error_modal} bg='danger' variant='danger' onHide={() => set_error_modal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>ERROR</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {show_error}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => {
                                    set_error_modal(false)
                                }}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                    {(is_loading === true) ?
                        <Row>
                            <Col className='text-center'>
                                <h1>
                                    <Spinner size='lg' animation="border" />
                                </h1>
                            </Col>
                        </Row> : ''
                    }
                    <Row>
                        <Col className='text-center'>

                            <h1>
                                Total:
                                <b>
                                    {cart.reduce((accumulator, currentValue) => {
                                        return accumulator + (currentValue.price * currentValue.quantity);
                                    }, 0)}Rs
                                </b>
                            </h1>
                            <h3>
                                Online Payment Now:
                                <b>
                                    {cart.reduce((accumulator, currentValue) => {
                                        if (currentValue.order_payment_type === 2) {
                                            return accumulator + ((parseInt(currentValue.price) * 0.3) * currentValue.quantity)
                                        } else if (currentValue.order_payment_type === 3) {
                                            return accumulator + (parseInt(currentValue.price) * currentValue.quantity)
                                        }
                                        return accumulator
                                    }, 0)}Rs
                                </b>
                            </h3>
                            <h5>
                                Negotiation considered Total:
                                <b>
                                    {cart.reduce((accumulator, currentValue) => {
                                        if (currentValue.order_negotiate === 1) {
                                            return accumulator + (parseInt(currentValue.negotiation_offer) * currentValue.quantity)
                                        }
                                        else {
                                            return accumulator + (currentValue.price * currentValue.quantity)
                                        }

                                    }, 0)}Rs
                                </b>
                            </h5>
                            <Form.Text>Shipping not included, supplier will calculate and provide with order</Form.Text>
                        </Col>
                    </Row>
                    <Card.Footer className='text-end'>
                        {(cart.length && cart.length > 0) ?
                            <Button variant='success' size='lg' className='rounded-pill' onClick={() => set_info_modal(true)}>PROCEED TO CHECKOUT</Button> : <hr />
                        }
                    </Card.Footer>
                </Card>
            </Container >
        </>
    )
}




export default Cart