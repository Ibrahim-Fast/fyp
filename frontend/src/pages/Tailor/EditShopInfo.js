import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '../../api/useAxiosPrivate'
import { Alert, Modal, Table, Form, Button, Card, Col, Container, ProgressBar, Row, Toast } from 'react-bootstrap'
import axios from '../../api/axios'

const EditShopInfo = () => {
    const { id } = useParams()
    const [refresh, setrefresh] = useState(false)
    const [form_error, set_form_error] = useState("")
    const [error_show, set_error_show] = useState(false)
    const [response, setresponse] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const [contact_modal_alert, set_contact_modal_alert] = useState(false)
    const [contact_name, set_contact_name] = useState('')
    const [contact_number, set_contact_number] = useState('')
    const [contact_modal, set_contact_modal] = useState(false)
    const [shop_description, set_shop_description] = useState('')
    const [schedule_modal_alert, set_schedule_modal_alert] = useState(false)
    const [schedule_modal, set_schedule_modal] = useState(false)
    const [days_from, set_days_from] = useState('')
    const [days_to, set_days_to] = useState('')
    const [holiday_switch, set_holiday_switch] = useState(false)
    const [duration_from, set_duration_from] = useState('')
    const [duration_to, set_duration_to] = useState('')
    const [isLoading, set_isLoading] = useState(true)
    const [shop_name, set_shop_name] = useState('')
    const [shop_address, set_shop_address] = useState('')
    const [shop_address_link, set_shop_address_link] = useState('')
    const [shop_type, set_shop_type] = useState()
    const [shop_visibilty, set_shop_visibilty] = useState()
    const [shop_schedule, set_shop_schedule] = useState([])
    const [other_contacts, set_other_contacts] = useState([])
    const [submitted, set_submitted] = useState(false)

    const remove_contact = async (n) => {
        let arr = other_contacts.filter((item, index) => index !== n)
        set_other_contacts(arr)
    }
    const remove_schedule_item = async (n) => {
        let arr = shop_schedule.filter((item, index) => index !== n)
        set_shop_schedule(arr)
    }
    const add_contact = async (name, number) => {
        set_other_contacts(prev => [{ contact_name: name, contact_number: number }, ...prev])
    }

    const controller = new AbortController()

    const submit_info = async () => {

        let form_data = {
            shop_name: shop_name,
            shop_address: shop_address,
            shop_address_link: shop_address_link,
            visibility: parseInt(shop_visibilty),
            shop_type: shop_type,
            other_contacts: other_contacts,
            shop_schedule: shop_schedule,
            shop_description: shop_description
        }
        // console.log(form_data)
        try {
            const response = await axiosPrivate.put(
                `/api/tailor/shop/${id}`, form_data,
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


    useEffect(() => {
        set_isLoading(true)
        const local_controller = new AbortController()
        const f = async () => {

            try {
                const da_response = await
                    axiosPrivate.get(`/api/tailor/shop/si/${id}`)
                setresponse(da_response.data)
                console.log(da_response.data)
                set_shop_name(da_response.data.shop_name)
                set_shop_address(da_response.data.shop_address)
                set_shop_description(da_response.data.shop_description)
                set_shop_address_link(da_response.data.shop_address_link)
                set_shop_type(da_response.data.shop_type)
                set_shop_visibilty(da_response.data.visibility)
                set_other_contacts(da_response.data.other_contacts)
                set_shop_schedule(da_response.data.shop_schedule)
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



    const add_schedule = (duration_from, duration_to, days_from, days_to, holiday_switch) => {

        let i = {};
        if (holiday_switch === true) {
            i = {
                duration_from: '-',
                duration_to: '-',
                day_from: days_from,
                day_to: days_to,
            }
        }
        else {
            i = {
                duration_from: duration_from,
                duration_to: duration_to,
                day_from: days_from,
                day_to: days_to,
            }
        }
        set_shop_schedule(prev => [i, ...prev])
        return;
    }

    return (
        <Container className='my-2 py-2 justify-content-center align-content-center text-center'>
            {
                (submitted) ?
                    <Navigate to={`/shops/${id}`} replace /> : ''
            }

            <Row className='my-2'>
                <Col className='d-flex flex-row-reverse my-2'>
                    <Button variant='info' onClick={() => setrefresh(Prev => !Prev)}>Refresh</Button>
                </Col>
            </Row>

            <Row>
                <h1>
                    EDIT SHOP INFO
                </h1>
            </Row>
            {(isLoading)}
            <Row>
                <Col xs={12} md={6} className='my-1'>
                    <Row>
                        <Col>
                            <Form.Label>SHOP NAME</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control value={shop_name} onChange={e => { set_shop_name(e.target.value) }} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} className='my-1'>
                    <Row>
                        <Col>
                            <Form.Label>SHOP ADDRESS</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control value={shop_address} onChange={e => { set_shop_address(e.target.value) }} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} className='my-1'>
                    <Row>
                        <Col>
                            <Form.Label>SHOP ADDRESS LINK</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control value={shop_address_link} onChange={e => { set_shop_address_link(e.target.value) }} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} className='my-1'>
                    <Row>
                        <Col>
                            <Form.Label>SHOP STATUS</Form.Label>
                        </Col>
                        <Col>
                            {(response.status === 0) ?
                                < ProgressBar variant="danger" now={100} animated label={"CURRENT STATUS : INACTIVE"} /> :
                                < ProgressBar variant="info" now={100} animated label={"CURRENT STATUS : OK"} />
                            }
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} className='my-1'>
                    <Row>
                        <Col>
                            <Form.Label>SHOP VISIBILTY</Form.Label>
                        </Col>
                        <Col>
                            <Form.Select value={shop_visibilty} onChange={(e) => {
                                set_shop_visibilty(e.target.value)
                            }}>
                                < option value={0}>Not Visible</option>
                                <option value={1}>Visible</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>SHOP TYPE</Form.Label>
                        </Col>
                        <Col>
                            <Form.Select value={shop_type} onChange={(e) => set_shop_type(e.target.value)}>
                                < option value={1}>normal</option>
                                <option value={2}>B2B (Only bulk Orders)</option>
                                <option value={3}>B2C (Only bulk Orders)</option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} className='my-1'>
                    <Row>
                        <Col>
                            <Form.Label>SHOP ADDED ON</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control disabled readOnly value={(response && response.createdAt) ? response.createdAt.split('T')[0] : ''} />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} className='my-1'>
                    <Row>
                        <Col>
                            <Form.Label>SHOP DESCRIPTION</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control as='textarea' value={shop_description} onChange={e => set_shop_description(e.target.value)} />
                        </Col>
                    </Row>
                </Col>

                <Col xs={12}></Col>
                <Col xs={12} md={6} className='my-1'>
                    <Row>
                        <Col>
                            <Form.Label>OTHER CONTACTS</Form.Label>
                        </Col>
                        <Col>
                            <Button variant='secondary' onClick={() => set_contact_modal(true)}>ADD CONTACT</Button>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} className='my-1'>
                    <Table striped bordered hover responsive size='sm'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>CONTACT NAME</th>
                                <th>CONTACT NUMBER</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(other_contacts)} */}
                            {(other_contacts) ?
                                other_contacts.map((i, n) => {
                                    return (<tr key={n}>
                                        <td>{n + 1}</td>
                                        <td>{i.contact_name}</td>
                                        <td>{i.contact_number}</td>
                                        <td><Button variant='secondary' onClick={() => remove_contact(n)}>DELETE</Button></td>
                                    </tr>)
                                })
                                : ""}
                        </tbody>
                    </Table>
                </Col>
                <Col xs={12} md={6} className='my-1'>
                    <Row>
                        <Col>
                            <Form.Label>SHOP SCHEDULE</Form.Label>
                        </Col>
                        <Col>
                            <Button variant='secondary' onClick={() => set_schedule_modal(true)}>ADD SCHEDULE</Button>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12} md={6} className='my-1'>
                    <Table striped bordered hover responsive size='sm'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>DAY FROM</th>
                                <th>DAY TILL</th>
                                <th>DURATION FROM</th>
                                <th>DURATION TILL</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(shop_schedule) ?
                                shop_schedule.map((i, n) => {
                                    return (
                                        <tr>
                                            <td>{n + 1}</td>
                                            <td>{i.day_from}</td>
                                            <td>{i.day_to}</td>
                                            <td>{i.duration_from}</td>
                                            <td>{i.duration_to}</td>
                                            <td><Button variant='secondary' onClick={() => remove_schedule_item(n)}>REMOVE</Button></td>
                                        </tr>
                                    )
                                })
                                : ""}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Modal show={contact_modal} onHide={() => {
                        set_contact_modal(false)
                        set_contact_modal_alert(false)
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>ADD CONTACT NUMBER</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Alert variant="danger" show={contact_modal_alert} onClose={() => set_contact_modal_alert(false)} dismissible>
                                INCOMPLETE
                            </Alert>
                            <Form.Label>CONTACTS NAME</Form.Label>
                            <Form.Control value={contact_name} onChange={e => set_contact_name(e.target.value)} type='text' required id='contact_name' />
                            <Form.Label>CONTACT NUMBER</Form.Label>
                            <Form.Control value={contact_number} onChange={e => set_contact_number(e.target.value)}
                                onInput={e => { e.target.value = e.target.value.replace(/[^+0-9]/g, '').replace(/(\..*)\./g, '$1') }}
                                required id='contact_number' />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-secondary" onClick={() => {
                                set_contact_modal(false)
                                set_contact_modal_alert(false)
                            }}>
                                CLOSE
                            </Button>
                            <Button variant="secondary" onClick={() => {
                                if (contact_name === '' || contact_number.toString() === '') {
                                    set_contact_modal_alert(true)
                                    return
                                }
                                set_contact_modal_alert(false)
                                set_contact_modal(false)
                                add_contact(contact_name, contact_number)
                                set_contact_name('')
                                set_contact_number('')
                            }}>
                                ADD
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
                <Col>
                    <Modal show={schedule_modal} onHide={() => {
                        set_schedule_modal(false)
                        set_holiday_switch(false)
                        set_schedule_modal_alert(false)
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>ADD SCHEDULE</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Alert variant="danger" show={schedule_modal_alert}
                                onClose={() => { set_schedule_modal_alert(false) }} dismissible>
                                INCOMPLETE
                            </Alert>
                            <Row className='my-1'>
                                <Form.Label>SELECT DAY</Form.Label>
                            </Row>
                            <Row className='my-1'>
                                <Col>
                                    <Form.Label>FROM:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Select value={days_from} onChange={e => set_days_from(e.target.value)} >
                                        <option value={'-'}> SELECT DAY FROM</option>
                                        <option value={'mon'}> MONDAY</option>
                                        <option value={'tue'}> TUESDAY</option>
                                        <option value={'wed'}> WEDNESDAY</option>
                                        <option value={'thr'}> THRUSDAY</option>
                                        <option value={'fri'}> FRIDAY</option>
                                        <option value={'sat'}> SATURDAY</option>
                                        <option value={'sun'}> SUNDAY</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className='my-1'>
                                <Col>
                                    <Form.Label>TO:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Select value={days_to} onChange={e => set_days_to(e.target.value)} >
                                        <option value={'-'}> SELECT DAY TILL</option>
                                        <option value={'mon'}> MONDAY</option>
                                        <option value={'tue'}> TUESDAY</option>
                                        <option value={'wed'}> WEDNESDAY</option>
                                        <option value={'thr'}> THRUSDAY</option>
                                        <option value={'fri'}> FRIDAY</option>
                                        <option value={'sat'}> SATURDAY</option>
                                        <option value={'sun'}> SUNDAY</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className='my-1'>
                                <Col>
                                    <Form.Label>SELECT DURATION</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Check
                                        type="switch"
                                        value={holiday_switch}
                                        label="MARK AS HOLIDAYS"
                                        onChange={(e) => { set_holiday_switch(prev => !prev) }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>DURATION FROM:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control value={duration_from} type='time' onChange={e => set_duration_from(e.target.value)} disabled={holiday_switch} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>DURATION TO:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control value={duration_to} type='time' onChange={e => set_duration_to(e.target.value)} disabled={holiday_switch} />
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-secondary" onClick={() => {
                                set_schedule_modal(false)
                                set_holiday_switch(false)
                                set_schedule_modal_alert(false)
                            }}>
                                CLOSE
                            </Button>
                            <Button variant="secondary" onClick={() => {
                                if (
                                    ((duration_to === '' || duration_from === '') && !holiday_switch) || (!(duration_to === '' || duration_from === '') && holiday_switch) ||
                                    days_from === '' || days_to === '') {
                                    set_schedule_modal_alert(true)
                                    return
                                }
                                add_schedule(duration_from, duration_to, days_from, days_to, holiday_switch)
                                set_schedule_modal_alert(false)
                                set_schedule_modal(false)
                                set_holiday_switch(false)
                                set_duration_from('')
                                set_duration_to('')
                                set_days_from('')
                                set_days_to('')
                            }}>
                                ADD
                            </Button>
                        </Modal.Footer>
                    </Modal></Col>
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


            <Row className='my-4 py-4'>

                <Col xs={12} md={12} className='my-1' >
                    <Row>
                        <Col>
                            <Button variant='secondary' size='xl' as={Link} to={`/shops/${id}`}>CANCEL</Button>
                        </Col>
                        <Col>
                            <Button variant='secondary' size='xl' onClick={() => submit_info()}>SAVE</Button>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </Container >
    )
}



export default EditShopInfo