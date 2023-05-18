import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, Container, ListGroup, ListGroupItem, Row, Table } from 'react-bootstrap'
import useAxiosPrivate from '../../api/useAxiosPrivate'
import { Link } from 'react-router-dom'

const CustomerOrders = () => {
  const axiosPrivate = useAxiosPrivate()

  const [responseState, set_responseState] = useState({})
  const [isloading, set_isloading] = useState(true)
  const [current_page, set_current_page] = useState(1)
  const [goto_page, set_goto_page] = useState('')
  const [button_load, set_button_load] = useState(false)
  const [reload, set_reload] = useState(false)


  const order = async (_id, n) => {
    try {
      const response = await axiosPrivate.
        patch(`/api/customer/orders/product`, { _id: _id, status: n }
        )
      set_reload(p => !p)
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
          '/api/customer/orders/product',
          {
            signal: controller.signal
          })
        // set_responseState(JSON.parse(JSON.stringify(response.data)))
        set_responseState(response.data)
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
  }, [reload])


  return (
    <Container >
      <Row className='my-2 py-2'>
        <Col className='text-center'>
          <Card >
            <Card.Body>
              <h1>ORDERS INFO</h1>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      {
        (responseState && responseState.results && responseState.results.length && responseState.results.length > 0) ?
          <>
            {responseState.results.map((i, n) => {
              return (
                <Row key={n} className='my-2 py-2'>
                  <Col xs={12}>
                    <Card >
                      <Card.Header>
                        <h3>
                          Order#{' ' + (n + 1)}
                        </h3>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col>
                            <Card.Subtitle>{i.createdAt.split('T')[0]}</Card.Subtitle>
                            <Card.Title>ORDER INFORMATION</Card.Title>
                            <Card.Subtitle>Order Id: {' ' + i._id}</Card.Subtitle>
                            <br />
                            <Card.Subtitle>{i.product_name}</Card.Subtitle>
                            <br />
                            <Card.Subtitle>Delivery Address: {i.delivery_address}</Card.Subtitle>
                            <br />
                            <Card.Text>
                              Total:{' ' + (i.amount * i.quantity)}RS
                              <br />
                              Quantity:{' ' + (i.quantity)}
                              <br />
                              Per Item:{' ' + (i.amount)}RS
                              <br />
                              Given:{' ' + (i.given)}RS
                              <br />
                              Remaining:{' ' + (i.balance)}RS
                              <br />
                              <Button variant='info' as={Link} to={`/shops/view/${i.shop_id}`} className='m-3'>Go to Shop</Button>
                              <Button variant='info' as={Link} to={`/products/view/${i.product_id}`} className='m-3'>Go to Product</Button>
                            </Card.Text>
                          </Col>
                          <Col>
                            <Table responsive={true}>
                              <tbody>
                                <tr>
                                  <td>
                                    <h6>
                                      Order Status:
                                    </h6>
                                  </td>
                                  <td>
                                    {(i.status === -2) ? <>
                                      <h6>
                                        rejected by customer
                                      </h6>
                                    </> :
                                      (i.status === -1) ? <>
                                        <h6>
                                          rejected by tailor
                                        </h6>
                                      </> :
                                        (i.status === 0) ? <>
                                          <h6>
                                            Order placed, but not accepted
                                          </h6>
                                        </>
                                          :
                                          (i.status === 1) ? <>
                                            <h6>
                                              Order accepted
                                            </h6>
                                          </>
                                            :
                                            (i.status === 2) ? <>
                                              <h6>
                                                Order has been ammended by other, please respond to changes
                                              </h6>
                                            </>
                                              :
                                              (i.status === 3) ? <>
                                                <h6>
                                                  You ammended the order
                                                </h6>
                                              </>
                                                :
                                                (i.status === 4) ? <>
                                                  <h6>
                                                    In delivery
                                                  </h6>
                                                </>
                                                  :
                                                  (i.status === 5) ? <>
                                                    <h6>
                                                      Order completed
                                                    </h6>
                                                  </>
                                                    :
                                                    (i.status === 6) ? <>
                                                      <h6>
                                                        You have accepted the changes
                                                      </h6>
                                                    </>

                                                      : <>
                                                        <h6>
                                                          Undefined Error
                                                        </h6>
                                                      </>
                                    }

                                  </td>
                                </tr>
                                {(i.tailor_estimated_dates) ?
                                  <tr>
                                    <td>Estimated dates</td>
                                    <td>i.tailor_estimated_dates.min</td>
                                    <td>i.tailor_estimated_dates.max</td>
                                  </tr> : <></>
                                }
                                {(i.customer_expected_dates) ?
                                  <tr>
                                    <td>Your expected dates</td>
                                    <td>i.customer_expected_dates.min</td>
                                    <td>i.customer_expected_dates.max</td>
                                  </tr> : <></>
                                }
                              </tbody>
                            </Table>
                            {(i.extra_charges) ?
                              <Table>
                                <tbody>
                                  {(i.extra_charges).map((itm, n) => {
                                    return (
                                      <tr key={n}>
                                        <td>{itm.description}</td>
                                        <td>{itm.amount}</td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </Table>
                              : <></>
                            }
                            {(i.urgent === 1) ? <>
                              <h4>
                                <Badge bg='danger' >URGENT ORDER</Badge>
                              </h4>
                            </> : <>
                              <h4>
                                <Badge bg='secondary'>NORMAL ORDER</Badge>
                              </h4>
                            </>}
                            {(i.negotiation_status === 1) ? <>
                              <h2>
                                <Badge bg='danger' >NEGOTIATION OFFERED: {i.negotiation_amount_offered}RS</Badge>
                              </h2>
                            </> : <>
                            </>}
                            {(i.order_payment_type === 1) ? <>
                              <h4>
                                <Badge bg='danger' >Cash On Delivery</Badge>
                              </h4>
                            </> : (i.order_payment_type === 2) ?
                              <>
                                <h4>
                                  <Badge bg='secondary'>30% Online Advance</Badge>
                                </h4>
                              </> :
                              (i.order_payment_type === 3) ? <>
                                <h4>
                                  <Badge bg='secondary'>100% Online Advance</Badge>
                                </h4>
                              </> : <></>
                            }
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <Container>
                          <Row>
                            <Col>
                              <Button hidden={!(i.status === 0 || i.status === 2 || i.status === 3)}
                                variant='danger'
                                onClick={() => { order(i._id, -2) }}
                              >
                                Cancel Order
                              </Button>
                            </Col>
                            <Col>
                              <Button hidden={!(i.status === 2)}
                                variant='warning'
                              // onClick={() => { order(i._id, 3) }}
                              >
                                Amend Order</Button>
                            </Col>
                            <Col>
                              <Button hidden={!(i.status === 2)}
                                variant='success'
                                onClick={() => { order(i._id, 6) }}
                              >
                                Accept Order</Button>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              )
            })}
          </> :
          <>
            <Row className='my-2 py-2'>
              <Col className='text-center'>
                <Card >
                  <Card.Body>
                    <h1>No orders to Show Either there are none or Reload the Page</h1>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
      }
    </Container>

  )
}

export default CustomerOrders