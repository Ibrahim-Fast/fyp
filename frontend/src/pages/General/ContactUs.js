// import React from 'react'

// const ContactUs = () => {
//   return (
//     <div>ContactUs</div>
//   )
// }

// export default ContactUs


import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can implement your logic to handle form submission, such as sending an email or storing the contact details in a database.
    console.log(formData);
    // Reset the form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Container >
      <h1>Contact Us</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row>
          <Col className='m-3 p-3 text-center'>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ContactUsPage;
