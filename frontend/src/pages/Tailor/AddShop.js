import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Image, InputGroup, Row, Toast } from 'react-bootstrap';
import useAxiosPrivate from '../../api/useAxiosPrivate';
import ImageSrc from '../ImageSrc'
import { Navigate } from 'react-router-dom';

const AddShop = () => {

    const [select_picture, set_select_picture] = useState([])
    const [select_picture_file_data, set_select_picture_file_data] = useState([])
    const [showing_selected_picture, set_showing_selected_picture] = useState(0)

    const [gps_clicked, set_gps_clicked] = useState(false)
    const [shop_name, set_shop_name] = useState("")
    const [shop_address, set_shop_address] = useState("")
    const [shop_type, set_shop_type] = useState(1)
    const [map_link, set_map_link] = useState("")
    const [form_error, set_form_error] = useState("")
    const [error_show, set_error_show] = useState(false)

    const [submitted, set_submitted] = useState(false)

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(set_location);
        } else {
            // console.log("Geolocation is not supported by this browser.")
            set_form_error("Geolocation is not supported by this browser please manually paste link")
            set_error_show(true)
            return
        }
    }


    function set_location(position) {
        const link = `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude}%2C${position.coords.longitude}`
        // // const link = `https://www.google.com/maps/@${position.coords.latitude},${position.coords.longitude}z`
        // console.log(link)
        set_map_link(link)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (shop_address === "" || map_link === "" || shop_name === "") {
            set_form_error("INCOMPLETE FORM PLEASE COMPLETE ALL FIELDS TO CONTINUE")
            set_error_show(true)
            return
        }
        await send_shop_info()
    }

    const axiosPrivate = useAxiosPrivate();
    const [loading, set_loading] = useState(false)


    const controller = new AbortController()

    const send_shop_info = async () => {
        // set_loading(false)
        // console.log('here submitting')
        // console.log('here submitting')
        // console.log(select_picture_file_data)
        // console.log(Array.from(select_picture_file_data))
        try {
            const response = await axiosPrivate.post(
                '/api/tailor/shop', {
                shop_images: select_picture_file_data,
                shop_name: shop_name,
                shop_address: shop_address,
                shop_address_link: map_link,
                shop_type: shop_type
            },
                {
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
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
        set_loading(false)
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
            console.log(new_)
            set_select_picture_file_data(files)
            set_select_picture(new_)
        }
    }
    return (
        <>
            {
                (submitted) ?
                    <Navigate to={'/shops'} replace /> : ''
            }
            <Form className='my-3 py-3 border rounded'>
                <Container >
                    <h1>
                        INPUT BASIC SHOP INFORMATION
                    </h1>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label>SHOP NAME</Form.Label>
                                <Form.Control type="text" placeholder="Enter Shop Name" required value={shop_name} onChange={(e) => set_shop_name(e.target.value)} />
                                <Form.Label>SHOP ADDRESS</Form.Label>
                                <Form.Control type="text" placeholder="Enter Shop Address exact" required value={shop_address} onChange={(e) => set_shop_address(e.target.value)} />
                            </Form.Group>

                            {(map_link === "" || !gps_clicked) ? <>
                                <Form.Label>SHOP ADDRESS LINK</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control value={map_link} onChange={e => set_map_link(e.target.value)} required />
                                    <Button variant="outline-secondary border" id="getGPS" onClick={() => {
                                        getLocation()
                                        set_gps_clicked(true)
                                    }}>
                                        GET GPS LOCATION
                                    </Button>
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    Please Double check your location, Incase if GPS not giving correct location then manually Input Dropped pin link from Google Maps
                                </Form.Text>
                            </> : <>
                                <Form.Label>CURRENT SHOP LOCATION SET AS</Form.Label>
                                <InputGroup className="mb-3 " >
                                </InputGroup>
                                <ListGroup>
                                    <Button variant="info" onClick={() => window.open(map_link, "_blank")}>
                                        {/* <a href={map_link} target="_blank">{map_link}</a> */}
                                        {map_link}
                                    </Button>
                                    <Button variant="outline-secondary" className='my-2' onClick={() => {
                                        set_map_link("")
                                        set_gps_clicked(prev => !prev)
                                    }}>
                                        RESET LINK
                                    </Button>
                                </ListGroup>

                            </>}

                            {(select_picture && select_picture.length > 0) ? <>
                                <Row>
                                    <Col md='auto' className='text-center justify-content-center mx-auto'>
                                        <Card >
                                            <Card.Body>
                                                <Card.Header>SELECTED SHOP IMAGES</Card.Header>
                                                <Image src={select_picture[showing_selected_picture]} fluid />
                                                <Card.Text>
                                                    MAKE SURE THAT IMAGE IS CORRECT
                                                </Card.Text>
                                                <Card.Subtitle>Showing {showing_selected_picture + 1} of {select_picture.length} selected</Card.Subtitle>
                                                <Button variant="danger" className='mx-1' onClick={() => {
                                                    set_select_picture([])
                                                    set_select_picture_file_data([])
                                                    set_showing_selected_picture(0)
                                                }}>CLEAR ALL</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                {(select_picture.length > 1) ?
                                    < Row md='auto' className='text-center justify-content-center mx-auto'>
                                        <Col>
                                            <Button variant='info' onClick={() => set_showing_selected_picture(prev => {
                                                // console.log('prev called', prev)
                                                // console.log('now', select_picture)
                                                if (prev === 0) {
                                                    return prev
                                                }
                                                prev = parseInt(prev - 1)
                                                return prev
                                                // console.log('changed', prev)
                                                // console.log('after', select_picture)
                                            })}>PREVIOUS</Button>
                                        </Col>
                                        <Col>
                                            <Button variant='info' onClick={() => set_showing_selected_picture(prev => {
                                                // console.log('next called', prev)
                                                // console.log('now', select_picture)
                                                if (prev >= select_picture.length - 1) {
                                                    return prev
                                                }
                                                prev = parseInt(prev + 1)
                                                return prev
                                                // console.log('changed', prev)
                                                // console.log('after', select_picture)
                                            })}>NEXT</Button>
                                        </Col>
                                    </Row> : ""
                                }
                            </>
                                : <Form.Group className="mb-3">
                                    <Form.Label>ADD SHOP IMAGE</Form.Label>
                                    <Form.Control type="file" required
                                        accept='image/jpg, image/jpeg, image/png'
                                        multiple={true}
                                        onChange={(e) => {
                                            change_select_picture_state(e.target.files)
                                        }} />
                                </Form.Group>}
                            <Form.Group className="mb-3" >
                                <Form.Label>SHOP TYPE</Form.Label>
                                <Form.Select defaultValue={1} onChange={e => set_shop_type(e.target.value)}>
                                    <option value={1}>Normal(allows Both by defaut)</option>
                                    <option value={2}>B2B Only (allows bulk ordering and milestone orders)</option>
                                    <option value={3}>B2C Only (allows only single ordering)</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
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
                        <Button type='submit' disabled={loading} variant="outline-secondary" onClick={(e) => handleSubmit(e)} >
                            {
                                (loading === true) ?
                                    <>
                                        <b>
                                            ...SAVING INFO...
                                        </b>
                                    </> : <>
                                        <b>
                                            SUBMIT
                                        </b>
                                    </>
                            }
                        </Button>
                    </Row>
                </Container>
            </Form >
        </>
    )

}

export default AddShop