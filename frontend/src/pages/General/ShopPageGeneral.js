import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../api/useAxiosPrivate'
import { Button, Card, Carousel, Col, Container, Image, ProgressBar, Row, Table } from 'react-bootstrap'
import ImageSrc from '../ImageSrc'
import Badge from 'react-bootstrap/Badge';
import ReviewPage from './Reviews'

const ShopPageGeneral = () => {
  const { id } = useParams()
  const [refresh, setrefresh] = useState(true)
  const [ifError, setifError] = useState(false)
  const [error_msg, seterror_msg] = useState()
  const [response, setresponse] = useState('')
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    const f = async () => {
      try {
        const da_response = await axiosPrivate.get(`/api/g/shop/si/${id}`)
        setresponse(da_response.data)
        // console.log(da_response.data)
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

  const get_shop_type = (shop_type) => {
    switch (shop_type) {
      case 1:
        {
          return ' Normal'
        }
      case 2: {
        return ' B2B only'
      }
      case 3: {
        return ' B2C only'
      }
      default: {
        return 'undefined'
      }
    }
  }


  return (
    <Container className='my-3 py-3' >

      <Row className='justify-content-evenly my-3'>
        <Col className='d-flex flex-row-reverse'>
          <Button variant='info' onClick={() => setrefresh(Prev => !Prev)}>Refresh</Button>
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
                      SHOP INFORMATION
                    </h1>
                  </Card.Header>
                  <Container fluid className='justify-content-center text-center'>
                    <Row>
                      <Col>
                        <h3>
                          SHOP IMAGES
                        </h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {/* <ImageSrc url={response.shop_pictures[0]} instyle={{ 'width': "80vw" }} /> */}
                        <Carousel slide interval={3000} variant='dark' style={{ minHeight: "30vh", maxHeight: "auto" }}>
                          {
                            response.shop_pictures.map((i, n) => {
                              return (
                                <Carousel.Item key={n}>
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
                    <Card.Title>{response.shop_name}</Card.Title>
                    <Card.Subtitle>
                      {response.shop_address}
                    </Card.Subtitle>

                    <Card.Text>
                      <Link>
                        {response.shop_address_link}
                      </Link>
                    </Card.Text>
                    <Card.Text>
                      {response.shop_description}
                    </Card.Text>
                    <Card.Text>
                      SHOP TYPE:
                      {get_shop_type(response.shop_type)
                      }
                    </Card.Text>

                    Other Contacts Provided:
                    {(response.other_contacts && response.other_contacts.length > 0) ?
                      <Table striped bordered hover responsive size='sm'>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>CONTACT NAME</th>
                            <th>CONTACT NUMBER</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(response.other_contacts) ?
                            response.other_contacts.map((i, n) => {
                              return (<tr key={n}>
                                <td>{n + 1}</td>
                                <td>{i.contact_name}</td>
                                <td>{i.contact_number}</td>
                              </tr>)
                            })
                            : ""}

                          {/* {console.log(other_contacts)} */}
                        </tbody>
                      </Table>
                      : "None"
                    }
                    <br />
                    SHOP SCHEDULE:
                    {(response.shop_schedule && response.shop_schedule.length > 0) ?
                      <Table striped bordered hover responsive size='sm'>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>DAY FROM</th>
                            <th>DAY TILL</th>
                            <th>DURATION FROM</th>
                            <th>DURATION TILL</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            response.shop_schedule.map((i, n) => {
                              return (
                                <tr>
                                  <td>{n + 1}</td>
                                  <td>{i.day_from}</td>
                                  <td>{i.day_to}</td>
                                  {(i.duration_from === '-' && i.duration_to === '-') ?
                                    <td colSpan={2} className='text-center'>Shop Day Off</td> : <>
                                      <td>{i.duration_from}</td>
                                      <td>{i.duration_to}</td>
                                    </>
                                  }
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>

                      : "None"
                    }


                    <Card.Text>
                      SHOP ADDED ON:
                      <b>
                        {response.createdAt.split('T')[0]}
                      </b>
                    </Card.Text>
                  </Card.Body>
                  <ReviewPage />
                </Card>

              }
            </>
          }
        </Col>
      </Row>
    </Container >
  )
}

export default ShopPageGeneral