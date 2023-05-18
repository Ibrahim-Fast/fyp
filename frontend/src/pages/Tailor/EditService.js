import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../api/useAxiosPrivate'
import { Alert, Modal, Table, Form, Button, Card, Col, Container, ProgressBar, Row, Toast, InputGroup, FloatingLabel } from 'react-bootstrap'
import axios from '../../api/axios'

const EditService = () => {
    const axiosPrivate = useAxiosPrivate()

    const { shop_id, id } = useParams()
    const [refresh, setrefresh] = useState(false)
    const [form_error, set_form_error] = useState("")
    const [error_show, set_error_show] = useState(false)

    const [service_name, set_service_name] = useState('')
    const [service_description, set_service_description] = useState('')
    const [service_price, set_service_price] = useState(0)
    const [service_discount, set_service_discount] = useState(0)
    const [visibility, set_visibility] = useState(0)
    const [service_options, set_service_options] = useState([])
    const [payment_methods, set_payment_methods] = useState([])
    const [ordering_methods, set_ordering_methods] = useState([])

    const [age_group, set_age_group] = useState('')
    const [service_type, set_service_type] = useState('')
    const [gender, set_gender] = useState('')
    const [season, set_season] = useState('')
    const [tags, set_tags] = useState([])


    const [current_tag_value, set_current_tag_value] = useState('')
    const [category_addition_modal, set_category_addition_modal] = useState(false)
    const [isLoading, set_isLoading] = useState(true)
    const [submitted, set_submitted] = useState(false)


    const controller = new AbortController()

    const submit_info = async () => {

        let form_data = {
            service_name: service_name,
            service_description: service_description,
            service_price: service_price,
            service_discount: service_discount,
            visibility: visibility,
            service_options: service_options,
            payment_methods: payment_methods,
            ordering_methods: ordering_methods,
            service_categories: {
                age_group: age_group,
                service_type: service_type,
                gender: gender,
                season: season,
                other_tags: tags,
            }
        }
        // console.log(form_data)
        try {
            const response = await axiosPrivate.put(
                `/api/tailor/service/${shop_id}/${id}`, form_data,
                {
                    signal: controller.signal
                }
            )
            set_submitted(true)
        } catch (e) {
            controller.abort()
            set_error_show(true)
            if (e.response && e.response.data && e.response.data.error_msg) {
                set_form_error(e.response.data.error_msg)
            } else {
                set_form_error("Encountered Error")
            }
            console.log(e)
        } finally {
            set_isLoading(false)
        }

    }

    const check_form = async () => {

        if (service_name === '' || service_price === 0 || payment_methods.length === 0 || ordering_methods === 0) {
            set_form_error("form is Incomplete, donot leave name and price empty, also select atleast one of all the options provided in payment and ordering methods")
            set_error_show(true)
            return
        }
        await submit_info()

    }

    useEffect(() => {
        set_isLoading(true)
        const local_controller = new AbortController()
        const f = async () => {
            try {
                const da_response = await
                    axiosPrivate.get(`/api/tailor/${shop_id}/service/si/${id}`)

                set_service_name(da_response.data.service_name)
                set_service_description(da_response.data.service_description)
                set_service_price(da_response.data.service_price)
                set_service_discount(da_response.data.discount)
                set_visibility(da_response.data.visibility)

                set_service_description(da_response.data.service_description)
                set_service_options(da_response.data.service_options)
                set_ordering_methods(da_response.data.ordering_methods)
                set_payment_methods(da_response.data.payment_methods)

                set_age_group(da_response.data.service_categories.age_group)
                set_gender(da_response.data.service_categories.gender)
                set_season(da_response.data.service_categories.season)
                set_service_type(da_response.data.service_categories.service_type)
                set_tags(da_response.data.service_categories.other_tags)

                // console.log(da_response.data)
            } catch (e) {
                set_error_show(true)
                if (e.response && e.response.data && e.response.data.error_msg) {
                    set_form_error(e.response.data.error_msg)
                } else {
                    set_form_error("Encountered Error")
                }
                console.log(e)
            } finally {
                set_isLoading(false)
            }
        }
        f()
        return () => {
            local_controller.abort()
        }
    }, [refresh])


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
    const change_service_options = (number) => {
        if (service_options.includes(number)) {
            set_service_options((prev) => {
                let n = prev.filter(i => i !== number)
                return n
            })
        }
        else {
            set_service_options(prev => [number, ...prev])
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




    return (

        <Container className='align-content-center text-center justify-content-center py-3 my-3'>
            {
                (submitted) ?
                    <Navigate to={`/services/${shop_id}/${id}`} replace /> : ''
            }
            <Row className='my-2'>
                <Col className='d-flex flex-row-reverse my-2'>
                    <Button variant='info' onClick={() => setrefresh(Prev => !Prev)}>Refresh</Button>
                </Col>
            </Row>

            <Row >
                <Col>
                    <Card >
                        <Container className='align-content-center text-center justify-content-center'>
                            <Row className='m-2'>
                                <Col>
                                    <h1>
                                        EDIT service
                                    </h1>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={12} className='m-2'>
                                    <Row>
                                        <Col >
                                            <Form.Label >service Name</Form.Label>
                                        </Col>
                                        <Col >
                                            <Form.Control type='text' className='w-50' placeholder='service NAME' value={service_name} onChange={(e) => set_service_name(e.target.value)} />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={12} className='m-2'>
                                    <Row>
                                        <Col>
                                            <Form.Label>service Price</Form.Label>
                                        </Col>
                                        <Col>
                                            <InputGroup>
                                                <Form.Control type='number' style={{ maxWidth: '20vw' }} onWheel={(e) => e.target.blur()} value={service_price} onChange={(e) => {
                                                    if (parseFloat(e.target.value) >= 0 || e.target.value === '') {
                                                        set_service_price(e.target.value)
                                                    }
                                                }} />
                                                <InputGroup.Text>PKR</InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={12} className='m-2'>
                                    <Row>
                                        <Col>
                                            <Form.Label>service Discount</Form.Label>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col sm={12} >
                                                    <InputGroup>
                                                        <Form.Control type='number' style={{ maxWidth: '15vw' }} min={0} onWheel={(e) => e.target.blur()} value={service_discount} onChange={(e) => {
                                                            if ((parseFloat(e.target.value) >= 0 && parseFloat(e.target.value) <= 99) || e.target.value === '') {
                                                                set_service_discount(e.target.value)
                                                            }
                                                        }} />
                                                        <InputGroup.Text>%</InputGroup.Text>
                                                    </InputGroup>
                                                </Col>
                                                <Col sm={12} className='my-2'>
                                                    <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                        <Row>
                                                            <Col sm={12} className='my-2' >
                                                                <FloatingLabel label="Discounted Amount">
                                                                    <Form.Control type='number' disabled style={{ maxWidth: '35vw' }} value={(service_discount !== null) ?
                                                                        (service_price !== null) ? ((service_price * (service_discount / 100))) : 0 : 0} />
                                                                </FloatingLabel>
                                                            </Col>

                                                            <Col className='my-2'>
                                                                <FloatingLabel label="Total Price">
                                                                    <Form.Control type='number' disabled style={{ maxWidth: '35vw' }} value={(service_discount !== null) ?
                                                                        (service_price !== null) ? (service_price - (service_price * (service_discount / 100))) : 0 : 0} />
                                                                </FloatingLabel>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Col>

                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>



                                <Col sm={12} className='m-2'>
                                    <Row className='align-content-center text-center justify-content-center'>
                                        <Col>
                                            <Form.Label>service Description</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control as='textarea' className='w-75' placeholder='DESCRIPTION' value={service_description} onChange={(e) => set_service_description(e.target.value)} />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm={12} className='m-2'>
                                    <Row className='align-content-center text-center justify-content-center'>
                                        <Col>
                                            <Modal show={category_addition_modal} onHide={() => set_category_addition_modal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>ADD CATEGORIES FOR service</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Add relevant Categories Tags/keywords for Improved Searching and Allow customers to more easily get to your service, adding unnecessary irrelevent extra tags can cause the service to be reported, if number of reporting is high then service will get removed
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
                                        <Col>
                                            <Form.Label ><h1>
                                                service Categories
                                            </h1>
                                            </Form.Label>
                                        </Col>
                                    </Row>
                                </Col>
                                <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>service CATEGORY</th>
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
                                            <td>Service Type</td>
                                            <td>
                                                <Form.Select value={service_type} onChange={(e) => {
                                                    set_service_type(e.target.value)
                                                }}>
                                                    <option value="-">None</option>
                                                    <option value="sewing_simple">Sewing/Stitching(simple)</option>
                                                    <option value="sewing_design">Sewing/Stitching(with designing)</option>
                                                    <option value="finishing">finishing</option>
                                                    <option value="pico">Pico</option>
                                                    <option value="alteration">Alteration</option>
                                                    <option value="dyeing">Dyeing</option>
                                                    <option value="knitting">knitting</option>
                                                    <option value="quilting">Quilting</option>
                                                    <option value="teaching_class">Tailor Teaching Classes</option>
                                                    <option value="repairing">Repairing</option>
                                                    <option value="other">others</option>
                                                </Form.Select>
                                            </td>
                                        </tr>

                                    </tbody>
                                </Table>

                                <Row>
                                    <Col>
                                        <Form.Label ><h1>
                                            Edit Other service Options
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
                                            <td>Allow service to be visible to new customers </td>
                                            <td>New Customers can see the service else the wont be able to find it, unless they have link or they have ordered the service</td>
                                            <td>
                                                <Form.Check
                                                    isValid={true}
                                                    type="switch"
                                                    id="custom-switch"
                                                    checked={(visibility && visibility === 1) ? true : false}
                                                    onChange={() => set_visibility(p => {
                                                        if (p == 1) {
                                                            return 0
                                                        }
                                                        return 1
                                                    })}
                                                    label={(visibility && visibility === 1) ? "VISIBLE" : "NOT VISIBLE"}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Allow service Cost to be Negotiable </td>
                                            <td>Customers can negotiate cost and tailor can accept, amend or reject such demands</td>
                                            <td>
                                                <Form.Check
                                                    isValid={true}
                                                    type="switch"
                                                    id="custom-switch"
                                                    checked={(service_options && service_options.includes(1)) ? true : false}
                                                    onChange={() => change_service_options(1)}
                                                    label={(service_options && service_options.includes(1)) ? "ALLOW" : "NOT ALLOWED"}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Stock based Order accepting</td>
                                            <td>Shows customer whether service is in stock, if there is 0 stock then customer is not allowed to order, if this option is not selected then each order must be manually accepted or rejected</td>
                                            <td>
                                                <Form.Check
                                                    isValid={true}
                                                    type="switch"
                                                    id="custom-switch"
                                                    checked={(service_options && service_options.includes(2)) ? true : false}
                                                    onChange={() => change_service_options(2)}
                                                    label={(service_options && service_options.includes(2)) ? "ALLOW" : "NOT ALLOWED"}

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
                                {(isLoading) ?
                                    '' :
                                    <Col>
                                        <Button variant='secondary' as={Link} to={`/services/${shop_id}/${id}`} >
                                            CANCEL
                                        </Button>
                                    </Col>
                                }
                                <Col>
                                    <Button variant='secondary' onClick={() => check_form()} disabled={(isLoading) ?
                                        true : false
                                    } >
                                        {(isLoading) ?
                                            '. . . SUBMITTING INFO . . .' : 'SAVE CHANGES'
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



export default EditService