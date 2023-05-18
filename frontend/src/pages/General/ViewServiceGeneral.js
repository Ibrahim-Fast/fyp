import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import { Accordion, Badge, Button, Card, Carousel, Col, Container, Form, InputGroup, ProgressBar, Row, Table, Toast } from 'react-bootstrap'
import ImageSrc from '../ImageSrc'
import axios from '../../api/axios';
import { UserState } from '../../context/UserState';
import ReviewPage from './Reviews';


const ViewServiceGeneral = () => {

  const { user_state, set_cart } = useContext(UserState)

  const { id } = useParams()
  const [refresh, setrefresh] = useState(true)
  const [ifError, setifError] = useState(false)
  const [error_msg, seterror_msg] = useState()
  const [response, setresponse] = useState('')
  const [buy_modal, set_buy_modal] = useState(false)
  const [bulk_buy_modal, set_bulk_buy_modal] = useState(false)


  const [order_quantity, set_order_quantity] = useState(1)
  const [order_negotiate, set_order_negotiate] = useState(0)
  const [order_negotiation_offer, set_order_negotiation_offer] = useState(0)

  const [order_urgent, set_order_urgent] = useState(0)
  const [order_message, set_order_order_message] = useState('')

  const [order_payment_type, set_order_payment_type] = useState(1)
  const [order_error, set_order_error] = useState('')
  const [order_error_show, set_order_error_show] = useState(false)


  const get_payment_method_string = (n) => {
    switch (n) {

      case 1: {
        return "Cash On Delivery"
      }
      case 2: {
        return "30% Advanced online"
      }
      case 3: {
        return "100% Advanced online"
      }


      default:
        return undefined;
    }
  }


  const add_to_cart = (item) => {
    if (order_negotiate === 1 && order_negotiation_offer === 0 && order_quantity === 0) {
      set_order_error("Your Offer and quantity cannot be 0")
      set_order_error_show(true)
      return
    }
    // console.log(order_negotiate === 1 && order_negotiation_offer === 0 && order_quantity === 0)
    // console.log(order_negotiate === 1, order_negotiation_offer === 0, order_quantity === 0)
    const order_detail = {
      price: response.service_price - (response.service_price * (response.discount / 100)),
      shop_id: response.shop_id,
      service_id: response._id,
      quantity: order_quantity,
      order_negotiate: order_negotiate,
      negotiation_offer: (order_negotiate === 1) ? order_negotiation_offer : -1,
      order_payment_type: parseInt(order_payment_type),
      urgent: order_urgent,
      name: response.service_name
    }
    // console.log(order_detail)
    try {
      set_cart(p => [order_detail, ...p])
    }
    catch {
      set_order_error("Cannot add more there seems to be problem with your browser")
      set_order_error_show(true)
      return
    }
    set_buy_modal(false)
    set_order_error_show(false)
  }
  useEffect(() => {
    const f = async () => {
      try {
        const da_response = await axios.get(`/api/g/service/si/${id}`)
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


  return (
    <Container className='my-3 py-3' >
      <Row className='justify-content-evenly my-3'>
        <Col >
          <Button variant='danger' onClick={() => setrefresh(Prev => !Prev)}>REPORT</Button>
        </Col>
        <Col className='d-flex flex-row-reverse'>
          <Button variant='secondary' onClick={() => setrefresh(Prev => !Prev)}>Refresh</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {(ifError === true) ?
            <>
              {!(error_msg) ?
                "Please Reload, As there seems to be a problem with loading the content" : error_msg}
            </>
            : <>
              {(!response || response === '') ? "Could not Process Response Please reload" :
                <Card >
                  <Card.Body>
                    <Card.Header className='text-center'>
                      <h1>
                        SERVICE INFORMATION
                      </h1>
                    </Card.Header>
                    <Container className='my-2 py-2'>
                      <Row>
                        <Modal show={bulk_buy_modal} onHide={() => set_bulk_buy_modal(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title>GET QUOTE FOR BUYING IN BULK</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>Buying in Bulk can allow you to buy the service in great quantity, it is also possible to have service for wholesale price if the supplier is willing to lower the price</Modal.Body>
                          <Modal.Body>To Buy in bulk you first need to get quote from the supplier by providing the amount you want to buy, you can also provide the max amount, if the supplier is interested in your offer he can accept it, give counter offer or reject the dealing </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={() => set_bulk_buy_modal(false)}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={() => set_bulk_buy_modal(false)}>
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Row>
                      <Row>
                        <Modal show={buy_modal} onHide={() => set_buy_modal(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title><h3>
                              ADD TO CART
                            </h3>
                            </Modal.Title>
                          </Modal.Header>

                          <Modal.Body>
                            <h4>
                              Input Order Details
                            </h4>
                            <Form>
                              <Container>
                                <hr />
                                <Row className='m-1'>
                                  <Col >
                                    <Form.Label>Current Price{(response.discount !== 0) ? ' (after discount)' : ''}</Form.Label>
                                  </Col>
                                  <Col>
                                    <InputGroup >
                                      <Form.Control readOnly type='number' min={1} className='w-50' value={response.service_price - (response.service_price * (response.discount / 100))} />
                                      <InputGroup.Text >Rs</InputGroup.Text>
                                    </InputGroup>
                                  </Col>
                                </Row>
                                <hr />
                                <Row className='m-1'>
                                  <Col>
                                    <Form.Label>Quantity</Form.Label>
                                  </Col>
                                  <Col>
                                    <Form.Control type='number' min={1} className='w-50' value={order_quantity} onChange={e => {
                                      if (e.target.value > 0) {
                                        set_order_quantity(parseInt(e.target.value))
                                        return
                                      }
                                      set_order_quantity(1)
                                      return
                                    }} />
                                  </Col>
                                </Row>
                                <hr />
                                <Row className='m-1'>
                                  <Col>
                                    <Form.Label>Payment Type</Form.Label>
                                  </Col>
                                  <Col>
                                    <Form.Select value={order_payment_type} onChange={e => set_order_payment_type(e.target.value)}>
                                      {response.payment_methods.map((i, n) => {
                                        return (
                                          <option key={n} value={i}>{get_payment_method_string(i)} </option>
                                        )
                                      })}
                                    </Form.Select>
                                  </Col>
                                </Row>
                                <hr />
                                <Row className='m-1'>
                                  <Col>
                                    <Form.Label>Urgent</Form.Label>
                                  </Col>
                                  <Col>
                                    <Form.Check
                                      checked={(order_urgent === 1) ? true : false}
                                      type="switch"
                                      onChange={() => set_order_urgent(p => {
                                        if (p === 1) {
                                          return 0
                                        }
                                        return 1
                                      })}
                                    />
                                  </Col>
                                </Row>

                                {(response.service_options.includes(1)) ?
                                  <>
                                    <Row className='m-1'>
                                      <Col>
                                        <Form.Label>Negotiate</Form.Label>
                                      </Col>
                                      <Col>
                                        <Form.Check
                                          checked={(order_negotiate === 1) ? true : false}
                                          type="switch"
                                          onChange={() => set_order_negotiate(p => {
                                            if (p === 1) {
                                              return 0
                                            }
                                            return 1
                                          })}
                                        />
                                      </Col>
                                    </Row>
                                    {
                                      (order_negotiate === 1) ?
                                        <>
                                          <hr />
                                          < Row className='m-1'>
                                            <Col>
                                              <Form.Label>Your Offer for single item</Form.Label>
                                            </Col>
                                            <Col>
                                              <InputGroup >
                                                <Form.Control type='number' min={1} className='w-50' value={order_negotiation_offer} onChange={e => set_order_negotiation_offer(e.target.value)} />
                                                <InputGroup.Text >Rs</InputGroup.Text>
                                              </InputGroup>
                                            </Col>
                                            <Col xs={12} className='m-2'>
                                              <Toast bg='danger' show={order_error_show}>
                                                <Toast.Header>
                                                  <strong className="me-auto">Error</strong>
                                                </Toast.Header>
                                                <Toast.Body >
                                                  {order_error}
                                                </Toast.Body>
                                              </Toast>
                                            </Col>
                                          </Row>
                                        </>
                                        : <></>
                                    }

                                  </>
                                  : ""}
                              </Container>
                            </Form>

                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="info" onClick={() => set_buy_modal(false)}>
                              Cancel
                            </Button>
                            <Button variant="success" onClick={() => {
                              add_to_cart()
                            }}>
                              Add to Cart
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Row>
                      <Row>
                        <Col sm={12} lg={8}>
                          <Container style={{
                            paddingLeft: 0,
                            paddingRight: 0
                          }}>
                            <Row>
                              <Carousel slide interval={3000} variant='dark' style={{ maxWidth: '100%', height: 'auto', maxHeight: '400px' }}>
                                {
                                  response.service_images.map((i, n) => {
                                    return (
                                      <Carousel.Item key={n} className='text-center'>
                                        <ImageSrc url={i} instyle={{ maxWidth: '100%', minHeight: '40vh', maxHeight: '40vh', objectFit: "contain" }} />
                                      </Carousel.Item>
                                    )
                                  })
                                }

                              </Carousel>
                            </Row>
                            <Row>
                              <Col className="d-flex flex-row-reverse">
                                {(response.createdAt) ?
                                  <b>
                                    <>
                                      {'Added: ' + response.createdAt.split('T')[0]}
                                    </>
                                  </b>
                                  : ''}
                              </Col>
                            </Row>
                            <Row>
                              <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header ><h1>SERVICE DESCRIPTION</h1></Accordion.Header>
                                  <Accordion.Body>
                                    {response.service_description}
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </Row>
                          </Container>
                        </Col>
                        <Col sm={12} lg={4}>
                          <Card.Title>
                            <h1>
                              {response.service_name}
                            </h1>
                          </Card.Title>
                          <Card.Subtitle>
                            <h3>
                              {(response.discount && response.discount !== 0) ?
                                <>
                                  <del>
                                    {response.service_price}RS
                                  </del>
                                  <br />
                                  {'Discount: '}
                                  {response.discount}%
                                  <br />
                                  {'Price after Discount: '}
                                  {response.service_price - (response.service_price * (response.discount / 100))}RS
                                </> : <>
                                  {response.service_price}RS
                                </>
                              }
                            </h3>
                          </Card.Subtitle>
                          <br />
                          {(response.service_options.includes(1)) ?
                            <h4>
                              <Badge bg='success' >
                                Negotiable
                              </Badge>
                            </h4>
                            : ""}
                          {(response.stock_status !== 0 || response.stock_amount !== 0) ?
                            <>
                              {(user_state !== 'general' ?
                                <>
                                  < Button variant='info' className='m-2' size='lg' onClick={() => set_buy_modal(true)} >
                                    <h3>
                                      BUY
                                    </h3>
                                  </Button>
                                  {
                                    (response.ordering_methods.includes(2) ?
                                      <Button variant='warning' className='m-2' size='lg' onClick={() => set_bulk_buy_modal(true)}>
                                        <h3>
                                          GET QUOTE
                                        </h3>
                                      </Button>
                                      : '')
                                  }

                                </>
                                :
                                <>
                                  < Button as={Link} to={'/login/customer'} target='_blank' variant='info' className='m-2' size='lg' >
                                    <h3>
                                      BUY
                                    </h3>
                                  </Button>
                                  {
                                    (response.ordering_methods.includes(2) ?
                                      <Button as={Link} to={'/login/customer'} target='_blank' variant='warning' className='m-2' size='lg' >
                                        <h3>
                                          GET QUOTE
                                        </h3>
                                      </Button>
                                      : '')
                                  }
                                </>)}
                            </>
                            : <h1>
                              <Badge bg='danger' >
                                Out of Stock
                              </Badge>
                            </h1>
                          }
                          <h3>
                            ACCEPTED ORDERING
                          </h3>
                          {
                            (response.ordering_methods.includes(1) ? <h4>
                              <Badge bg='success' >
                                Single Order Allowed
                              </Badge>
                            </h4> : '')
                          }
                          {
                            (response.ordering_methods.includes(2) ?
                              <h4>
                                <Badge bg='success' >
                                  Bulk Ordering Allowed
                                </Badge>
                              </h4> : '')
                          }
                          <br />
                          {(response.service_categories && (response.service_categories.gender || response.service_categories.age_group || response.service_categories.article_type || response.service_categories.season || response.service_categories.wear_type || response.service_categories.other_tags.length !== 0)) ? <>
                            <h3>
                              SERVICE CATEGORIES
                            </h3>
                            <Container>
                              <Row>
                                {(response.service_categories && response.service_categories.gender && response.service_categories.gender !== '-') ?
                                  <Col xs={3}>
                                    <h5>
                                      <Badge bg='success' >
                                        {response.service_categories.gender}
                                      </Badge>
                                    </h5>
                                  </Col>
                                  : <></>}
                                {(response.service_categories && response.service_categories.age_group && response.service_categories.age_group !== '-') ?
                                  <Col xs={3}>
                                    <h5>
                                      <Badge bg='success' >
                                        {response.service_categories.age_group}
                                      </Badge>
                                    </h5>
                                  </Col>
                                  : <></>}
                                {(response.service_categories && response.service_categories.article_type && response.service_categories.article_type !== '-') ?
                                  <Col xs={3}>
                                    <h5>
                                      <Badge bg='success' >
                                        {response.service_categories.article_type}
                                      </Badge>
                                    </h5>
                                  </Col>
                                  : <></>}
                                {(response.service_categories && response.service_categories.season && response.service_categories.season !== '-') ?
                                  <Col xs={6}>
                                    <h5>
                                      <Badge bg='success' >
                                        {'Season: ' + response.service_categories.season}
                                      </Badge>
                                    </h5>
                                  </Col>
                                  : <></>}
                                {(response.service_categories && response.service_categories.wear_type && response.service_categories.wear_type !== '-') ?
                                  <Col xs={6}>
                                    <h5>
                                      <Badge bg='success' >
                                        {'Wear: ' + response.service_categories.wear_type}
                                      </Badge>
                                    </h5>
                                  </Col>
                                  : <></>}
                                <br />
                                {(response.service_categories && response.service_categories.other_tags && response.service_categories.other_tags.length !== 0) ?
                                  <>
                                    {response.service_categories.other_tags.map((i, n) => {
                                      return (
                                        <Col key={n} xs='auto'>
                                          <h5>
                                            <Badge bg='success' >
                                              {'Tag: ' + i}
                                            </Badge>
                                          </h5>
                                        </Col>

                                      )
                                    })}
                                  </>
                                  : <></>}
                              </Row>
                            </Container>

                          </> : ''}
                        </Col>
                      </Row>
                    </Container>
                    <Card.Footer>
                    </Card.Footer>
                  </Card.Body>
                  <Row>
                    <ReviewPage />
                  </Row>
                </Card>
              }
            </>
          }
        </Col>
      </Row>
    </Container >
  )

}

export default ViewServiceGeneral