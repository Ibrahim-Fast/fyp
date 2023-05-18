import React, { useReducer, useState } from 'react'
import { Table, Modal, Button, Col, Container, Form, InputGroup, Row, Card, Image, Toast } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../../api/useAxiosPrivate'
import { Navigate } from 'react-router-dom';


const AddProduct = () => {
  const { id } = useParams()

  const axiosPrivate = useAxiosPrivate();

  const [form_error, set_form_error] = useState('')
  const [error_show, set_error_show] = useState(false)
  const [select_picture, set_select_picture] = useState([])
  const [select_picture_file_data, set_select_picture_file_data] = useState([])
  const [showing_selected_picture, set_showing_selected_picture] = useState(0)
  const [isLoading, set_isLoading] = useState(false)
  const [submitted, set_submitted] = useState(false)

  const [gender, set_gender] = useState('-')
  const [age_group, set_age_group] = useState('-')
  const [season, set_season] = useState('-')
  const [wear_type, set_wear_type] = useState('-')
  const [type, set_type] = useState('-')
  const [tags, set_tags] = useState([]);



  const [category_addition_modal, set_category_addition_modal] = useState(false)

  const [current_tag_value, set_current_tag_value] = useState('');

  const [product_name, set_product_name] = useState('');
  const [product_description, set_product_description] = useState('');
  const [product_price, set_product_price] = useState(0);

  const [product_options, set_product_options] = useState([1, 2])
  const [ordering_methods, set_ordering_methods] = useState([1, 2])
  const [payment_methods, set_payment_methods] = useState([1, 2, 3])



  const remove_tag = (n) => {
    set_tags(tags.filter((i, index) => {
      return n !== index
    }))
  }

  const change_payment_methods = (number) => {
    if (payment_methods.includes(number)) {
      set_payment_methods((prev) => {
        let n = prev.filter(i => i !== number)
        return n
      })
    }
    else {
      set_payment_methods(prev => [number, ...prev])
    }
  }
  const change_product_options = (number) => {
    if (product_options.includes(number)) {
      set_product_options((prev) => {
        let n = prev.filter(i => i !== number)
        return n
      })
    }
    else {
      set_product_options(prev => [number, ...prev])
    }
  }
  const change_ordering_methods = (number) => {
    if (ordering_methods.includes(number)) {
      set_ordering_methods((prev) => {
        let n = prev.filter(i => i !== number)
        return n
      })
    }
    else {
      set_ordering_methods(prev => [number, ...prev])
    }
  }

  const change_select_picture_state = (files) => {
    if (files && files.length > 0) {
      let temp = Array.from(files)
      let total_size = temp.reduce((t, i) => {
        return t + i.size
      }, 0)

      const size_in_mb = parseInt(total_size / 1000000)
      if (size_in_mb >= 5) {
        console.log('size overload')
        set_error_show(true)
        set_form_error('To many files selected or image file size are too big select few or select images having lower size')
        return
      }
      const new_ = temp.reduce((acc, i) => {
        acc.push(URL.createObjectURL(i))
        return acc
      }, [])
      // console.log(new_)
      set_select_picture_file_data(files)
      set_select_picture(new_)
    }
  }


  const check_form = async () => {
    if (product_name === '' ||
      product_description === '' ||
      product_price === 0 ||
      select_picture.length === 0 ||
      product_options.length === 0 ||
      ordering_methods.length === 0 ||
      payment_methods.length === 0) {
      set_error_show(true)
      set_form_error("FORM IS INCOMPLETE")
      return
    }
    await handle_submit()
  }

  const controller = new AbortController()

  const handle_submit = async () => {
    const form_data = {
      shop_id: id,
      product_name: product_name,
      product_description: product_description,
      product_price: parseFloat(product_price),
      product_images: select_picture_file_data,
      product_options: product_options,
      ordering_methods: ordering_methods,
      payment_methods: payment_methods,
      product_categories: {
        other_tags: tags,
        gender: gender,
        age_group: age_group,
        season: season,
        wear_type: wear_type,
        article_type: type
      }
    }
    set_isLoading(true)
    try {
      const response = await axiosPrivate.post(
        '/api/tailor/product', form_data,
        {
          signal: controller.signal,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      )
      set_isLoading(false)
      set_submitted(true)
      return JSON.stringify(response.data)
    }
    catch (err) {
      set_submitted(false)
      console.log(err)
      if (err.response.data && err.response.data.msg) {
        set_form_error(err.response.data.msg)
      } else {
        set_form_error('encountered error when saving to server')
      }
      set_error_show(true)
      controller.abort()
    }
    set_isLoading(false)

    // console.log(form_data)
  }

  return (

    <Container className='align-content-center text-center justify-content-center py-3 my-3'>
      {
        (submitted) ?
          <Navigate to={'/products'} replace /> : ''
      }

      <Row >
        <Col>
          <Card >
            <Container className='align-content-center text-center justify-content-center'>
              <Row className='m-2'>
                <Col>
                  <h1>
                    ADD PRODUCT
                  </h1>
                </Col>
              </Row>

              <Row>
                <Col sm={12} className='m-2'>
                  <Row>
                    <Col >
                      <Form.Label >Product Name</Form.Label>
                    </Col>
                    <Col >
                      <Form.Control type='text' className='w-50' placeholder='PRODUCT NAME' value={product_name} onChange={(e) => set_product_name(e.target.value)} />
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} className='m-2'>
                  <Row>
                    <Col>
                      <Form.Label>Product Price</Form.Label>
                    </Col>
                    <Col>
                      <InputGroup>
                        <Form.Control type='number' style={{ maxWidth: '20vw' }} onWheel={(e) => e.target.blur()} value={product_price} onChange={(e) => {
                          if (parseFloat(e.target.value) >= 0) {
                            set_product_price(e.target.value)
                          }
                        }} />
                        <InputGroup.Text>PKR</InputGroup.Text>
                      </InputGroup>
                    </Col>
                  </Row>
                </Col>



                <Col sm={12} className='m-2'>
                  <Row className='align-content-center text-center justify-content-center'>
                    <Col>
                      <Form.Label>Product Description</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control as='textarea' className='w-75' placeholder='DESCRIPTION' value={product_description} onChange={(e) => set_product_description(e.target.value)} />
                    </Col>
                  </Row>
                </Col>

                <Col sm={12} className='m-2'>
                  <Row className='align-content-center text-center justify-content-center'>
                    <Col>
                      <Modal show={category_addition_modal} onHide={() => set_category_addition_modal(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>ADD CATEGORIES FOR PRODUCT</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Add relevant Categories Tags/keywords for Improved Searching and Allow customers to more easily get to your product, adding unnecessary irrelevent extra tags can cause the product to be reported, if number of reporting is high then product will get removed
                        </Modal.Body>
                        <Modal.Body>
                          <h5>COMMONLY USED TAGS FOR IMPROVED SEARCHING</h5>
                          miscellaneous,
                          size large,
                          size medium,
                          size small,
                          color black,
                          color white,
                          accessories,
                          threads,
                          bolt,
                          stiched,
                          unstiched,
                          100% cotton,
                          100% cashmere,
                          100% wool,
                          embroidered, etc
                        </Modal.Body>
                        <Modal.Body>
                          <InputGroup className="mb-3">
                            <Form.Control placeholder='Enter Tag Here' value={current_tag_value} onChange={(e) => {
                              set_current_tag_value(e.target.value)
                            }} />
                            <Button variant="secondary" disabled={(current_tag_value === '') ? true : false} onClick={() => {
                              set_category_addition_modal(false)
                              set_tags(prev => [current_tag_value, ...prev])
                              set_current_tag_value('')
                            }}>
                              Add
                            </Button>
                          </InputGroup>

                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="info" onClick={() => set_category_addition_modal(false)} >
                            Cancel
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </Col>



                <Col sm={12} className='m-2'>
                  <Row>
                    {(select_picture && select_picture.length > 0) ? <>
                      <Row className='align-content-center text-center justify-content-center'>
                        <Col >
                          <Card>
                            <Card.Body>
                              <Card.Header>SELECTED PRODUCT IMAGES</Card.Header>
                              <Image src={select_picture[showing_selected_picture]} fluid />
                              <Card.Subtitle>Showing {showing_selected_picture + 1} of {select_picture.length} selected</Card.Subtitle>
                              <Button variant="danger" className='m-2' onClick={() => {
                                set_select_picture([])
                                set_select_picture_file_data([])
                                set_showing_selected_picture(0)
                              }}>CLEAR ALL</Button>
                              {(select_picture.length > 1) ?
                                < Row className='m-2'>
                                  <Col>
                                    <Button variant='info' onClick={() => set_showing_selected_picture(prev => {
                                      if (prev === 0) {
                                        return prev
                                      }
                                      prev = parseInt(prev - 1)
                                      return prev
                                    })}>PREVIOUS</Button>
                                  </Col>
                                  <Col>
                                    <Button variant='info' onClick={() => set_showing_selected_picture(prev => {
                                      if (prev >= select_picture.length - 1) {
                                        return prev
                                      }
                                      prev = parseInt(prev + 1)
                                      return prev
                                    })}>NEXT</Button>
                                  </Col>
                                </Row> : ""
                              }
                              <Card.Footer>
                                MAKE SURE THAT IMAGE IS CORRECT
                              </Card.Footer>
                            </Card.Body>

                          </Card>
                        </Col>
                      </Row>

                    </>
                      :
                      <>
                        <Col>
                          <Form.Label>Add Product Images</Form.Label>
                        </Col>
                        <Col>
                          <Form.Control type="file" required
                            accept='image/jpg, image/jpeg, image/png'
                            multiple={true}
                            className='w-75 '
                            onChange={(e) => {
                              change_select_picture_state(e.target.files)
                            }} />
                        </Col>
                      </>
                    }
                  </Row>
                </Col>


                <Col sm={12} className='m-2'>
                  <Row>
                    <Col>
                      <Form.Label ><h1>
                        Product Categories
                      </h1>
                      </Form.Label>
                    </Col>
                  </Row>
                </Col>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>PRODUCT CATEGORY</th>
                      <th>
                        <Button variant='secondary' onClick={() => set_category_addition_modal(true)}>ADD CATEGORY TAG</Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Extra Category Tags
                      </td>
                      <td>
                        <Table>
                          <tbody>
                            {(tags) ?
                              tags.map(
                                (i, n) => {
                                  return (
                                    <tr key={n}>
                                      <td>
                                        {i}
                                      </td>
                                      <td>
                                        <Button id='tag_button' variant='secondary' onClick={() => remove_tag(n)}>Remove tag</Button>
                                      </td>
                                    </tr>
                                  )
                                }
                              ) : ""
                            }
                          </tbody>
                        </Table>
                      </td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td>
                        <Form.Select value={gender} onChange={(e) => {
                          set_gender(e.target.value)
                        }}>
                          <option value="-">None</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <td>Age Group</td>
                      <td>
                        <Form.Select value={age_group} onChange={(e) => {
                          set_age_group(e.target.value)
                        }}>
                          <option value="-">None</option>
                          <option value="infant">infant</option>
                          <option value="child">Child</option>
                          <option value="adult">Adult</option>
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <td>Season</td>
                      <td>
                        <Form.Select value={season} onChange={(e) => {
                          set_season(e.target.value)
                        }}>
                          <option value="-">None</option>
                          <option value="summer">Summer</option>
                          <option value="winter">Winter</option>
                          <option value="both">All season</option>
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <td>Wear Type</td>
                      <td>
                        <Form.Select value={wear_type} onChange={(e) => {
                          set_wear_type(e.target.value)
                        }}>
                          <option value="-">None</option>
                          <option value="casual">Casual wear</option>
                          <option value="religious">Religious</option>
                          <option value="bussiness">bussiness</option>
                          <option value="formal">formal</option>
                          <option value="outer_wear">outer_wear</option>
                          <option value="uniform">uniform</option>
                          <option value="atheletic">atheletic</option>
                          <option value="special_occasion">Special Occasion</option>
                          <option value="other">others</option>
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>
                        <Form.Select value={type} onChange={(e) => {
                          set_type(e.target.value)
                        }}>
                          <option value="-">None</option>
                          <option value="others">others</option>
                          <option value="tops">tops</option>
                          <option value="sherwani">sherwani</option>
                          <option value="coat">coat</option>
                          <option value="waistcoat">waistcoat</option>
                          <option value="shirt">shirt</option>
                          <option value="tshirt">tshirt</option>
                          <option value="pants">pants</option>
                          <option value="jeans">jeans</option>
                          <option value="dress">dress</option>
                          <option value="kameez">kameez</option>
                          <option value="kurta">kurta</option>
                          <option value="shalwar">shalwar</option>
                          <option value="trousers">trousers</option>
                          <option value="pajama">pajama</option>
                          <option value="cardigan">cardigan</option>
                          <option value="scarf">scarf</option>
                          <option value="sweater">sweater</option>
                          <option value="jacket">jacket</option>
                          <option value="undergarment">undergarment</option>
                        </Form.Select>
                      </td>
                    </tr>

                  </tbody>
                </Table>

                <Row>
                  <Col>
                    <Form.Label ><h1>
                      Edit Other Product Options
                    </h1>
                    </Form.Label>
                  </Col>
                </Row>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th>OPTIONS</th>
                      <th>DESCRIPTION</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Allow Product Cost to be Negotiable </td>
                      <td>Customers can negotiate cost and tailor can accept, amend or reject such demands</td>
                      <td>
                        <Form.Check
                          isValid={true}
                          type="switch"
                          id="custom-switch"
                          checked={(product_options && product_options.includes(1)) ? true : false}
                          onChange={() => change_product_options(1)}
                          label={(product_options && product_options.includes(1)) ? "ALLOW" : "NOT ALLOWED"}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Stock based Order accepting</td>
                      <td>Shows customer whether product is in stock, if there is 0 stock then customer is not allowed to order, if this option is not selected then each order must be manually accepted or rejected</td>
                      <td>
                        <Form.Check
                          isValid={true}
                          type="switch"
                          id="custom-switch"
                          checked={(product_options && product_options.includes(2)) ? true : false}
                          onChange={() => change_product_options(2)}
                          label={(product_options && product_options.includes(2)) ? "ALLOW" : "NOT ALLOWED"}

                        />
                      </td>
                      {/* <td>nope</td> */}
                    </tr>
                  </tbody>
                </Table>

                <Row>
                  <Col>
                    <Form.Label ><h1>
                      Edit Allowed Ordering Methods
                    </h1>
                    </Form.Label>
                  </Col>
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr>
                        <th></th>
                        <th>OPTIONS</th>
                        <th>DESCRIPTION</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>SIMPLE ORDERING </td>
                        <td>Customer can order as single order , there is no schedule ,only time duration range, and orders are only local not international, On exceeding delivery duration from tailor range penalty will be imposed  </td>
                        <td>
                          <Form.Check
                            isValid={true}
                            type="switch"
                            checked={(ordering_methods && ordering_methods.includes(1)) ? true : false}
                            onChange={() => change_ordering_methods(1)}
                            label={(ordering_methods && ordering_methods.includes(1)) ? "ALLOW" : "NOT ALLOWED"}

                          />
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>BULK SCHEDULED ORDERING</td>
                        <td>Allows customer to create scheduleded orders and milestones, the ordering schedule must first be accepted by both parties, On breaking the schedule penalty will be imposed </td>
                        <td>
                          <Form.Check
                            isValid={true}
                            type="switch"
                            checked={(ordering_methods && ordering_methods.includes(2)) ? true : false}
                            onChange={() => change_ordering_methods(2)}
                            label={(ordering_methods && ordering_methods.includes(2)) ? "ALLOW" : "NOT ALLOWED"}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>

                <Row>
                  <Col>
                    <Form.Label ><h1>
                      Change Allowed Payment Methods
                    </h1>
                    </Form.Label>
                  </Col>

                </Row>
                <Table responsive striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>OPTIONS</th>
                      <th>DESCRIPTION</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>CASH ON DELIVERY FULL END</td>
                      <td>Customer only pay Full Amount at end after recieving order</td>
                      <td>
                        <Form.Check
                          isValid={true}
                          type="switch"
                          checked={(payment_methods && payment_methods.includes(1)) ? true : false}
                          onChange={() => change_payment_methods(1)}
                          label={(payment_methods && payment_methods.includes(1)) ? "ALLOW" : "NOT ALLOWED"}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>30% ADVANCE CASH</td>
                      <td>Customer pay 30% Amount in advance and pay remaining at end after recieving order</td>
                      <td>
                        <Form.Check
                          isValid={true}
                          type="switch"
                          checked={(payment_methods && payment_methods.includes(2)) ? true : false}
                          onChange={() => change_payment_methods(2)}
                          label={(payment_methods && payment_methods.includes(2)) ? "ALLOW" : "NOT ALLOWED"}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>100% ADVANCE ONLINE</td>
                      <td>Customer deposit 100% Amount in advance to us, after order is in satisfactory state then the amount will be transferred to tailor </td>
                      <td>
                        <Form.Check
                          isValid={true}
                          type="switch"
                          checked={(payment_methods && payment_methods.includes(3)) ? true : false}
                          onChange={() => change_payment_methods(3)}
                          label={(payment_methods && payment_methods.includes(3)) ? "ALLOW" : "NOT ALLOWED"}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Col md='auto' className='text-center justify-content-center mx-auto'>
                  <Toast bg='danger' onClose={() => set_error_show(false)} show={error_show} delay={5000} autohide>
                    <Toast.Header>
                      <strong className="me-auto">FORM ERROR</strong>
                    </Toast.Header>
                    <Toast.Body>{form_error}</Toast.Body>
                  </Toast>
                </Col>
              </Row>

              <Row className='my-2 py-2'>
                <Col>
                  <Button variant='secondary' onClick={() => check_form()} disabled={(isLoading) ?
                    true : false
                  } >
                    {(isLoading) ?
                      '. . . SUBMITTING INFO . . .' : 'SUBMIT'
                    }
                  </Button>
                </Col>
              </Row>
            </Container >
          </Card>
        </Col>
      </Row>
    </Container >
  )
}

export default AddProduct