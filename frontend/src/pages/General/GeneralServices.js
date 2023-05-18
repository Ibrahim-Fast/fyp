// import React from 'react'

// const GeneralServices = () => {
//   return (
//     <div>GeneralServices</div>
//   )
// }

// export default GeneralServices


import React, { useEffect, useRef, useState } from 'react'
import { Spinner, Button, Card, Col, Container, Row, Badge, CardImg, Image, Form, InputGroup, Figure } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

const GeneralServices = () => {

  const [responseState, set_responseState] = useState({})
  const [isloading, set_isloading] = useState(true)
  const [current_page, set_current_page] = useState(1)
  const [goto_page, set_goto_page] = useState('')
  const [button_load, set_button_load] = useState(false)

  const show_func = async (n) => {

    let pn = current_page
    if (n === 'n') {
      pn = current_page + 1
    } else if (n === 'p') {
      pn = current_page - 1
    } else {
      pn = n
    }
    set_current_page(pn)
    set_button_load(true)
    const get_info = async () => {
      try {
        const response = await axios.get(
          `/api/g/service/${pn}`)
        // console.log(response)
        set_responseState(response.data)
      }
      catch (err) {
        console.log('error', err)
      } finally {
        set_button_load(false)
      }
    }
    get_info()
    set_isloading(false)

  }
  // useEffect(() => {
  //   const controller = new AbortController()
  //   set_isloading(true)
  //   const get_info = async () => {
  //     try {
  //       const response = await axios.get(
  //         'api/g/service',
  //         {
  //           signal: controller.signal
  //         })
  //       // set_responseState(JSON.parse(JSON.stringify(response.data)))
  //       set_responseState(response.data)
  //       // console.log(response.data)
  //     }
  //     catch (err) {
  //       console.log('error', err)
  //     }
  //   }
  //   get_info()
  //   set_isloading(false)

  //   return () => {
  //     controller.abort()
  //   }
  // }, [])


  useEffect(() => {


    return () => {
      const controller = new AbortController()
      set_isloading(true)
      const get_info = async () => {
        try {
          const response = await axios.get(
            'api/g/service',
            {
              signal: controller.signal
            })
          // set_responseState(JSON.parse(JSON.stringify(response.data)))
          set_responseState(response.data)
          // console.log(response.data)
        }
        catch (err) {
          console.log('error', err)
        }
      }
      get_info()
      set_isloading(false)
    }
  }, [])

  return (
    <Container className='align-content-center justify-content-center my-2'>
      <Row>
        <Col>
          <h1>
            SERVICES
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
            ..Currently No Services to Show try reloading..
          </h1>
        </>
          : responseState.results.map((i, n) => {
            return (
              <Col className='mx-auto' key={n} md={12} lg={3} xxl={3} >
                <Card key={i._id} className='m-3 p-3' style={{ maxHeight: '440px', minHeight: '440px' }}>
                  <Card.Body style={{ textDecoration: 'none' }} as={Link} to={`/services/view/${i._id}`}>
                    <Container className='text-center align-content-center justify-content-center' >
                      <Row className='text-center justify-content-center align-content-center'>
                        {
                          (i.thumbnail) ?
                            <>
                              <Container
                                style={{ minHeight: "180px", maxHeight: "180px", width: '180px', overflow: 'hidden', position: 'relative' }}>
                                <Row >
                                  <Image src={i.thumbnail} className='img-fluid' alt="thumbnail" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: 'contain', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                                </Row>
                              </Container>
                            </>
                            : <></>
                        }
                        <Col xs={12} >
                          {/* <Card.Title> */}
                          <Card.Title style={{ height: "50px", overflow: "hidden" }}>
                            {(i.service_name) ?
                              <b>
                                {i.service_name}
                              </b>
                              : ""}
                          </Card.Title>
                          <Card.Text>
                            {(i.service_price) ?
                              <b>
                                {i.service_price}Rs
                              </b>
                              : ""}

                            {(i.discount === 0) ?
                              <>
                              </>
                              :
                              <>
                                <br />
                                Discount:
                                {' ' + i.discount}%
                              </>
                            }
                          </Card.Text>
                          {/* <Card.Text>
                            {(i.service_categories && (
                              (i.service_categories.age_group && i.service_categories.age_group !== '-') ||
                              (i.service_categories.gender && i.service_categories.gender !== '-') ||
                              (i.service_categories.article_type && i.service_categories.article_type !== '-') ||
                              (i.service_categories.season && i.service_categories.season !== '-') ||
                              (i.service_categories.wear_type && i.service_categories.wear_type !== '-')
                            )) ?
                              "Categories:" : ""}
                            <br />
                            {(i.service_categories) ?
                              <>
                                {(i.service_categories.age_group && i.service_categories.age_group !== '-') ?
                                  <>
                                    {'| ' + i.service_categories.age_group + ' '}
                                  </> : ""
                                }
                                {(i.service_categories.gender && i.service_categories.gender !== '-') ?
                                  <>
                                    {'| ' + i.service_categories.gender + ' '}
                                  </> : ""
                                }
                                {(i.service_categories.article_type && i.service_categories.article_type !== '-') ?
                                  <>
                                    {'| ' + i.service_categories.article_type + ' '}
                                  </> : ""
                                }
                                {(i.service_categories.season && i.service_categories.season !== '-') ?
                                  <>
                                    {'| ' + i.service_categories.season + ' '}
                                  </> : ""
                                }
                                {(i.service_categories.wear_type && i.service_categories.wear_type !== '-') ?
                                  <>
                                    {'| ' + i.service_categories.wear_type + ' |'}
                                  </> : ""
                                }
                              </> : ''
                            }
                            <br />
                          </Card.Text> */}
                        </Col>
                      </Row>

                    </Container>
                  </Card.Body>
                  <Row className='m-3 align-items-center text-center justify-content-center'>
                    <Col xs={6}>
                      <Button size='xs' variant='outline-info' as={Link} to={`/tailors/${i.tailor_id}`}>
                        VIEW TAILOR
                      </Button>
                    </Col >
                    <Col xs={6}>
                      <Button variant='outline-info' size='xs' as={Link} to={`/shops/${i.shop_id}`}>
                        VIEW SHOP
                      </Button>
                    </Col>
                  </Row>
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
              {
                (responseState.current <= responseState.of) ?
                  <>
                    Showing {responseState.current} of {responseState.of} results
                  </> : <></>}
              <br />

              {
                (Math.ceil(responseState.of / 10) > 1) ?
                  <>
                    Page
                    {' ' + current_page + ' of ' + Math.ceil(responseState.of / 10)}
                  </> : <></>
              }
              <br />
              {(responseState.previous === true) ?
                <Button disabled={button_load} variant='secondary' className='my-2' onClick={() => {
                  show_func('p')
                }}>Show Previous</Button>
                : ""
              }
              {(responseState.next === true) ?
                <Button disabled={button_load} variant='secondary' className='my-2' onClick={() => {
                  show_func('n')
                }}>Show Next</Button>
                : ""
              }

            </>
            : ""}
        </Col>
      </Row>
      {
        (Math.ceil(responseState.of / 10) > 1) ?
          <Row className="align-items-center justify-content-center mt-0 mb-0">
            <Col xs="auto">
              <InputGroup className="mb-3">
                <Form.Control
                  value={goto_page}
                  onChange={(e) => set_goto_page(e.target.value)}
                  style={{ maxWidth: "80px" }}
                  placeholder="Page"
                  type='number'
                  min={1}
                />
                <Button variant="outline-secondary" onClick={() => {
                  if (goto_page > Math.ceil(responseState.of / 10) || goto_page <= 0 || typeof goto_page === 'undefined') {
                    set_goto_page(current_page)
                    return
                  }
                  show_func(goto_page)
                }} >
                  Go to Page
                </Button>
              </InputGroup>
            </Col>
          </Row> : <></>
      }
    </Container >
  )
}

export default GeneralServices