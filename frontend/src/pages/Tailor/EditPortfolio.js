import React, { useContext, useEffect, useState } from 'react'
import { Spinner, Button, Card, Col, Container, Row, Badge, Image, Toast, Table, Form, Modal, InputGroup } from 'react-bootstrap';

import { Link, Navigate } from 'react-router-dom';
import useAxiosPrivate from '../../api/useAxiosPrivate';


const EditPortfolio = () => {
    const axiosPrivate = useAxiosPrivate()
    const [responseState, set_responseState] = useState({})
    const [isloading, set_isloading] = useState(true)
    const [button_load, set_button_load] = useState(false)
    const [page_error, set_page_error] = useState("")
    const [error_show, set_error_show] = useState(false)
    const [navigate_create, set_navigate_create] = useState(false)
    const [navigate_submitted, set_navigate_submitted] = useState(false)

    const [add_contact_modal, set_add_contact_modal] = useState(false)
    const [add_tag_modal, set_add_tag_modal] = useState(false)
    const [add_link_modal, set_add_link_modal] = useState(false)

    const [current_tag_value, set_current_tag_value] = useState('')
    const [current_social, set_current_social] = useState('-')
    const [current_link, set_current_link] = useState('')

    const [current_contact, set_current_contact] = useState('')
    const [current_contact_description, set_current_contact_description] = useState('')




    const [description, set_description] = useState('')
    const [city, set_city] = useState('')
    const [other_contacts, set_other_contacts] = useState([])
    const [search_tags, set_search_tags] = useState([])
    const [social_media_links, set_social_media_links] = useState([])
    const [visibility, set_visibility] = useState(0)

    const handleSubmit = async () => {
        if (visibility === '-' || visibility === '' || city === '') {
            set_page_error('Incomplete form')
            set_error_show(true)
            return
        }
        const form_data = {
            social_media_links: social_media_links,
            search_tags: search_tags,
            description: description,
            city: city,
            other_contacts: other_contacts,
            visibility: visibility
        }
        // console.log(form_data)
        try {
            const response = await axiosPrivate.put(
                `/api/tailor/portfolio`, form_data)
            set_navigate_submitted(true)

        } catch {
            set_page_error('Something went wrong please resubmit')
            set_error_show(true)
        }
        // set_error_show(true)
    }

    useEffect(() => {
        const controller = new AbortController()
        set_isloading(true)
        const get_info = async () => {
            try {
                const response = await axiosPrivate.get(
                    `/api/tailor/portfolio`,
                    {
                        signal: controller.signal
                    })
                set_responseState(response.data)
                set_description(response.data.description)
                set_city(response.data.city)
                set_other_contacts(response.data.other_contacts)
                set_search_tags(response.data.search_tags)
                set_social_media_links(response.data.social_media_links)
                set_visibility(response.data.visibility)
                set_error_show(false)
                // console.log(response.data)
            }
            catch (err) {
                // console.log(JSON.stringify(err))
                // if(err.message&&err.message==='canceled'){
                //     return
                // }
                if (err.response && err.response.data && err.response.data.error_msg) {
                    set_page_error(err.response.data.error_msg)
                    if (err.response.status === 404) {
                        setInterval(() => {
                            set_navigate_create(true)
                        }, 2000);
                    }

                } else {
                    set_page_error('please reload')
                }
                set_error_show(true)
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
            {(isloading) ?
                <>
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                </> : <></>}

            {(navigate_create === true) ? <Navigate to='create' /> : ""}
            {(navigate_submitted === true) ? <Navigate to='/portfolio' /> : ""}
            <Row>
                <Col>
                    {(responseState && responseState.tailor_id && responseState.tailor_id.first_name) ?
                        <Card className='m-3 p-3'>
                            <Card.Header className='text-center '>
                                <h1>
                                    {"EDIT " + responseState.tailor_id.first_name.toUpperCase() + ' ' + responseState.tailor_id.last_name.toUpperCase() + '\'s'} PORTFOLIO
                                </h1>
                            </Card.Header>
                            <Container className='text-center'>

                                <Col sm={12} className='m-2'>
                                    <Row className='align-content-center text-center justify-content-center'>
                                        <Col>
                                            <Modal show={add_tag_modal} onHide={() => set_add_tag_modal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>ADD TAGS FOR TARGET SEARCHING</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Add relevant Tags/keywords for Improved Searching and Allow customers to more easily get to you, adding unnecessary irrelevent extra tags can cause you to be reported, if number of reporting is high then the account will be suspended
                                                </Modal.Body>
                                                <Modal.Body>
                                                    <h5>COMMONLY USED TAGS FOR IMPROVED SEARCHING</h5>
                                                    Tailor , Fashion, fitter, alteration, garment tailor, industiral, seamstress, etc
                                                </Modal.Body>
                                                <Modal.Body>
                                                    <InputGroup className="mb-3">
                                                        <Form.Control placeholder='Enter Tag Here' value={current_tag_value} onChange={(e) => {
                                                            set_current_tag_value(e.target.value.toLowerCase())
                                                        }} />
                                                        <Button variant="secondary" disabled={(current_tag_value === '' || search_tags.find(o => o === current_tag_value)) ? true : false} onClick={() => {
                                                            set_add_tag_modal(false)
                                                            set_search_tags(prev => [current_tag_value, ...prev])
                                                            set_current_tag_value('')
                                                        }}>
                                                            Add
                                                        </Button>
                                                    </InputGroup>

                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="info" onClick={() => set_add_tag_modal(false)} >
                                                        Cancel
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm={12} className='m-2'>
                                    <Row className='align-content-center text-center justify-content-center'>
                                        <Col>
                                            <Modal show={add_link_modal} onHide={() => set_add_link_modal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>ADD SOCIAL MEDIA LINKS</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <InputGroup className="mb-3">
                                                        <Form.Select value={current_social} placeholder='select platform' onChange={(e) => {
                                                            set_current_social(e.target.value)
                                                        }}>
                                                            <option value="-">Select Platform</option>
                                                            <option value="facebook">Facebook</option>
                                                            <option value="twitter">Twitter</option>
                                                            <option value="instagram">Instagram</option>
                                                            <option value="linkden">Linkden</option>
                                                            <option value="google+">Google+</option>
                                                            <option value="other">Others</option>
                                                        </Form.Select>
                                                        <Form.Control placeholder='Enter Link Here' value={current_link} onChange={(e) => {
                                                            set_current_link(e.target.value)
                                                        }} />
                                                        <Button variant="secondary" disabled={(current_link === '' || current_social === '-' || social_media_links.find(o => (o.url === current_link && o.platform_name === current_social))) ? true : false} onClick={() => {
                                                            set_social_media_links(prev => [{ platform_name: current_social, url: current_link }, ...prev])
                                                            set_add_link_modal(false)
                                                            set_current_social('-')
                                                            set_current_link('')
                                                        }}>
                                                            Add
                                                        </Button>
                                                    </InputGroup>

                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="info" onClick={() => set_add_link_modal(false)} >
                                                        Cancel
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

                                        </Col>
                                    </Row>
                                </Col>



                                <Col sm={12} className='m-2'>
                                    <Row className='align-content-center text-center justify-content-center'>
                                        <Col>
                                            <Modal show={add_contact_modal} onHide={() => set_add_contact_modal(false)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>ADD OTHER CONTACTS</Modal.Title>
                                                </Modal.Header>

                                                <Modal.Body>

                                                    <Form.Control placeholder='Enter Contact Description' className='m-1' value={current_contact_description} onChange={(e) => {
                                                        set_current_contact_description(e.target.value)
                                                    }} />
                                                    <Form.Control placeholder='Enter Contact Number' className='m-1' value={current_contact} onChange={(e) => {
                                                        const regex = /^\+?[0-9]{0,11}[0-9]?$/
                                                        if (regex.test(e.target.value)) {
                                                            set_current_contact(e.target.value)
                                                        } else {
                                                            return
                                                        }
                                                    }} />
                                                    make sure to enter mobile including country code
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="info" onClick={() => set_add_contact_modal(false)} >
                                                        Cancel
                                                    </Button>
                                                    <Button variant="secondary"
                                                        className='d-flex text-end justify-content-end'
                                                        disabled={(current_contact === '' || current_contact.length !== 13 || other_contacts.find(o => o.contact_number === current_contact)) ? true : false}
                                                        onClick={() => {
                                                            set_add_contact_modal(false)
                                                            set_other_contacts(prev => [{ contact_number: current_contact, description: current_contact_description }, ...prev])
                                                            set_current_contact('')
                                                            set_current_contact_description('')
                                                        }}>
                                                        Add
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Col>
                                    </Row>
                                </Col>

                                <Card.Body>
                                    <Table responsive striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>
                                                    INFO
                                                </th>
                                                <th>
                                                    <Button variant="outline-success" className='m-1' size='sm' onClick={() => set_add_contact_modal(true)} >Add Other Contact</Button>
                                                    <Button variant="outline-success" className='m-1' size='sm' onClick={() => set_add_tag_modal(true)}>Add Tag</Button>
                                                    <Button variant="outline-success" className='m-1' size='sm' onClick={() => set_add_link_modal(true)}>Add Link</Button>

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Card.Text>
                                                        Description:
                                                    </Card.Text>
                                                </td>
                                                <td>
                                                    <Form.Control value={description} as='textarea' onChange={e => set_description(e.target.value)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    City
                                                </td>
                                                <td>
                                                    <Form.Control value={city} onChange={e => set_city(e.target.value)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Other Contacts
                                                </td>
                                                <td>
                                                    {(other_contacts.length === 0) ? "None Given" :
                                                        <>
                                                            <Table>
                                                                <tbody>
                                                                    {other_contacts.map(
                                                                        (i, n) => {
                                                                            return (
                                                                                <tr key={n}>
                                                                                    <td>{n + 1}</td>
                                                                                    <td>{i.contact_number}</td>
                                                                                    <td>{i.description}</td>
                                                                                    <td><Button size='sm' variant='danger' onClick={() => {
                                                                                        let arr = search_tags.filter((item, index) => index !== n)
                                                                                        set_search_tags(arr)
                                                                                    }}>Remove</Button></td>
                                                                                </tr>
                                                                            )
                                                                        }
                                                                    )
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Search Tags</td>
                                                <td>
                                                    {(search_tags.length === 0) ? "None Given" :
                                                        <>
                                                            <Table>
                                                                <tbody>
                                                                    {search_tags.map(
                                                                        (i, n) => {
                                                                            return (
                                                                                <tr key={n}>
                                                                                    <td>{n + 1}</td>
                                                                                    <td>{i}</td>
                                                                                    <td><Button size='sm' variant='danger' onClick={() => {
                                                                                        let arr = search_tags.filter((item, index) => index !== n)
                                                                                        set_search_tags(arr)
                                                                                    }}>Remove</Button></td>
                                                                                </tr>
                                                                            )
                                                                        }
                                                                    )
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </>
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Social Media Links</td>
                                                <td>
                                                    {(social_media_links.length === 0) ? "None Given" :
                                                        <>
                                                            <Table>
                                                                <tbody>
                                                                    {social_media_links.map(
                                                                        (i, n) => {
                                                                            return (
                                                                                <tr key={n}>
                                                                                    <td>{n + 1}</td>
                                                                                    <td>{i.platform_name}</td>
                                                                                    <td>{i.url}</td>
                                                                                    <td><Button size='sm' variant='danger' onClick={() => {
                                                                                        let arr = search_tags.filter((item, index) => index !== n)
                                                                                        set_social_media_links(arr)
                                                                                    }}>Remove</Button></td>
                                                                                </tr>
                                                                            )
                                                                        }
                                                                    )
                                                                    }
                                                                </tbody>
                                                            </Table>
                                                        </>
                                                    }
                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    Visibility
                                                </td>
                                                <td>
                                                    <Form.Select value={visibility} onChange={(e) => {
                                                        set_visibility(e.target.value)
                                                    }}>
                                                        <option value={0}>Not Visible</option>
                                                        <option value={1}>Visible</option>
                                                    </Form.Select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                    {(error_show === true) ? < Row >
                                        <Col md='auto' className='text-center justify-content-center mx-auto'>
                                            <Toast bg='danger' onClose={() => set_error_show(false)} show={error_show} autohide={true} delay={1500} >
                                                <Toast.Header>
                                                    <strong className="me-auto">FORM ERROR</strong>
                                                </Toast.Header>
                                                <Toast.Body>{page_error}</Toast.Body>
                                            </Toast>
                                        </Col>
                                    </Row> : <></>
                                    }

                                    <Button variant="outline-success" className='m-2' as={Link} to='/portfolio'>Cancel</Button>

                                    <Button variant="outline-success" className='m-2' onClick={() => handleSubmit()} >Save Changes</Button>

                                </Card.Body>
                                <Row>

                                </Row>
                            </Container>
                        </Card>
                        : (error_show === true) ? < Row >
                            <Col md='auto' className='text-center justify-content-center mx-auto'>
                                <Toast bg='danger' onClose={() => set_error_show(false)} show={error_show} autohide={true} delay={1500} >
                                    <Toast.Header>
                                        <strong className="me-auto">FORM ERROR</strong>
                                    </Toast.Header>
                                    <Toast.Body>{page_error}</Toast.Body>
                                </Toast>
                            </Col>
                        </Row>
                            : "It seems the request Failed please Reload this Page"}
                </Col>
            </Row >
        </Container >
    )
}

export default EditPortfolio










