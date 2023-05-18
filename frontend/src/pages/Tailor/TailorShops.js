import React, { useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import MyShops from '../../components/Tailor/Home/MyShops'

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link, Navigate } from 'react-router-dom';
const TailorShops = () => {
  const [form_agree, set_form_agree] = useState(false)
  const [showModal, set_showModal] = useState(false)

  return (
    <>
      <Container >
        <Row>
          <Col>
            <MyShops />
          </Col>
        </Row>
        <Row>
          <Col>

            <Modal show={showModal} onHide={() => set_showModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>TERMS OF SERVICES</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>
                  READ TERM OF SERVICES
                </h6>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem tempora reprehenderit culpa eveniet. Repudiandae doloribus sequi non cumque nobis ea consequatur quia.
                <b>
                  <hr />
                  <Row xs={12}>
                    <Col xs={10}>
                      <h4>
                        I AGREE TO TERM OF SERVICES
                      </h4>
                    </Col>
                    <Col>
                      <input className="form-check-input" type="checkbox" checked={(!form_agree) ? false : true} onChange={(e) => { set_form_agree(p => !p) }} />
                    </Col>
                  </Row>
                </b>
              </Modal.Body>
              <Modal.Footer>
                <button onClick={(e) => { set_form_agree(false) }}
                  variant="outline"
                  className="btn btn-info"
                  onChange={() => {
                    set_showModal(false)
                    set_form_agree(false)
                  }}
                >Close</button>
                <Link to={(!form_agree) ? '' : '/shops/add-shop'} >
                  <Button type="button"

                    className={(!form_agree) ? "disabled " : "btn-secondary"}
                  >
                    NEXT
                  </Button>
                </Link>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row >
          <Col className='text-end my-4'>
            <Button variant='secondary' onClick={() => set_showModal(true)}>
              <h3>
                ADD SHOP
                <AiOutlinePlusCircle />
              </h3>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TailorShops