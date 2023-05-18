import React, { useState } from 'react'
import { Card, Col, Container, Row, Button, Toast, Form, Table, Modal, InputGroup, Image } from 'react-bootstrap'
import useAxiosPrivate from '../../api/useAxiosPrivate';
import { Navigate } from 'react-router-dom';

const CreatePortfolio = () => {

    const axiosPrivate = useAxiosPrivate();
    const [form_error, set_form_error] = useState('')
    const [error_show, set_error_show] = useState(false)
    const [isLoading, set_isLoading] = useState(false)
    const [submitted, set_submitted] = useState(false)

    const [dob, set_dob] = useState('')
    const [city, set_city] = useState('')
    const [gender, set_gender] = useState('-')
    const [tags, set_tags] = useState([]);
    const [links, set_links] = useState([]);



    const [tag_addition_modal, set_tag_addition_modal] = useState(false)
    const [show_social_modal, set_show_social_modal] = useState(false)
    const [current_link, set_current_link] = useState('')
    const [current_social, set_current_social] = useState('-')
    const [current_tag_value, set_current_tag_value] = useState('');
    const [description, set_description] = useState('');




    const remove_tag = (n) => {
        set_tags(tags.filter((i, index) => {
            return n !== index
        }))
    }
    const remove_link = (n) => {
        set_links(links.filter((i, index) => {
            return n !== index
        }))
    }

    const check_form = async () => {
        if (
            gender === '-' ||
            dob === '' ||
            city === ''
        ) {
            set_error_show(true)
            set_form_error("FORM IS INCOMPLETE")
            return
        }
        // console.log(dob)
        await handle_submit()
    }

    const controller = new AbortController()

    const handle_submit = async () => {
        const form_data = {
            gender: gender,
            description: description,
            search_tags: tags,
            social_media_links: links,
            city: city,
            date_of_birth: dob
        }
        set_isLoading(true)
        try {
            const response = await axiosPrivate.post(
                '/api/tailor/portfolio', form_data,
                {
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
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
            
            if (err.response.status===409) {
                set_submitted(true)
            }
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
            {(submitted === true) ? <Navigate replace to='/portfolio' /> : ""}
            {
                (submitted) ?
                    <Navigate to={'/portfolio'} replace /> : ''
            }

            <Row >
                <Col>
                    <Card >
                        <Container className='align-content-center text-center justify-content-center'>
                            <Row className='m-2'>
                                <Col>
                                    <h1>
                                        Create Portfolio
                                    </h1>
                                </Col>
                            </Row>

                            <Row>


                                <Col sm={12} className='m-2'>
                                    <Row>
                                        <Col>
                                            <Form.Label ><h1>
                                                General Profile Information
                                            </h1>
                                            </Form.Label>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm={12} className='m-2'>
                                    <Row className='align-content-center text-center justify-content-center'>
                                        <Col>
                                            <Form.Label>Gender</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Select className='w-25' value={gender} onChange={(e) => {
                                                set_gender(e.target.value)
                                            }}>
                                                <option value="-">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm={12} className='m-2'>
                                    <Row className='align-content-center text-center justify-content-center'>
                                        <Col>
                                            <Form.Label>Date of Birth</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control className='w-25' type='date' value={dob} onChange={(e) => {
                                                set_dob(e.target.value)
                                            }} />
                                        </Col>
                                    </Row>
                                </Col>


                                <Col sm={12} className='m-2'>
                                    <Row className='align-content-center text-center justify-content-center'>
                                        <Col>
                                            <Form.Label>Professional Description</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control as='textarea' className='w-75' placeholder='DESCRIPTION' value={description} onChange={(e) => set_description(e.target.value)} />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={12} className='m-2'>
                                    <Row className='align-content-center text-center justify-content-center'>
                                        <Col>
                                            <Form.Label>City</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control className='w-75' placeholder='city' value={city} onChange={(e) => set_city(e.target.value)} />
                                        </Col>
                                    </Row>
                                </Col>

                                <Col sm={12} className='m-2'>
                                    <Row className='align-content-center text-center justify-content-center'>
                                        <Col>
                                            <Modal show={tag_addition_modal} onHide={() => set_tag_addition_modal(false)}>
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
                                                            set_current_tag_value(e.target.value)
                                                        }} />
                                                        <Button variant="secondary" disabled={(current_tag_value === '') ? true : false} onClick={() => {
                                                            set_tag_addition_modal(false)
                                                            set_tags(prev => [current_tag_value, ...prev])
                                                            set_current_tag_value('')
                                                        }}>
                                                            Add
                                                        </Button>
                                                    </InputGroup>

                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="info" onClick={() => set_tag_addition_modal(false)} >
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
                                            <Modal show={show_social_modal} onHide={() => set_show_social_modal(false)}>
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


                                                        <Button variant="secondary" disabled={(current_link === '' || current_social === '-') ? true : false} onClick={() => {
                                                            set_links(prev => [{ platform_name: current_social, url: current_link }, ...prev])
                                                            set_show_social_modal(false)
                                                            set_current_social('-')
                                                            set_current_link('')
                                                        }}>
                                                            Add
                                                        </Button>
                                                    </InputGroup>

                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="info" onClick={() => set_show_social_modal(false)} >
                                                        Cancel
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </Col>
                                    </Row>
                                </Col>





                                <Table responsive striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>
                                                <Button variant='secondary' onClick={() => set_tag_addition_modal(true)} className='m-2'>ADD TAG</Button>
                                                <Button className='m-2' variant='secondary' onClick={() => set_show_social_modal(true)}>ADD SOCIAL LINK</Button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Search Tags
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
                                            <td>
                                                Social Links
                                            </td>
                                            <td>
                                                <Table>
                                                    <tbody>
                                                        {(links) ?
                                                            links.map(
                                                                (i, n) => {
                                                                    return (
                                                                        <tr key={n}>
                                                                            <td>
                                                                                {i.platform_name}
                                                                            </td>
                                                                            <td>
                                                                                {i.url}
                                                                            </td>
                                                                            <td>
                                                                                <Button id='tag_button' variant='secondary' onClick={() => remove_link(n)}>Remove Link</Button>
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
                                            '. . . SUBMITTING INFO . . .' : 'NEXT'
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

export default CreatePortfolio