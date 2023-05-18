// import React from 'react'
// import { Container } from 'react-bootstrap'

// const GeneralHome = () => {
//   return (
//     <>
//       <Container className='px-4 mx-auto  my-2 py-2'>
//         <div>Home</div>
//       </Container>
//     </>)
// }

// export default GeneralHome



import React from 'react';
import { Card, Carousel, Col, Container, Row } from 'react-bootstrap';

const featuredProducts = [
  {
    name: 'Custom Suit',
    image: 'https://via.placeholder.com/300x200?text=Custom+Suit',
    discount: false,
  },
  {
    name: 'Tailored Shirt',
    image: 'https://via.placeholder.com/300x200?text=Tailored+Shirt',
    discount: true,
  },
  {
    name: 'Designer Blazer',
    image: 'https://via.placeholder.com/300x200?text=Designer+Blazer',
    discount: true,
  },
];

const CustomerHome = () => {
    
  return (
    <Container>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x400?text=Slide+1"
            alt="Slide 1"
          />
          <Carousel.Caption>
            <h3>Slide 1</h3>
            <p>Description for Slide 1</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x400?text=Slide+2"
            alt="Slide 2"
          />
          <Carousel.Caption>
            <h3>Slide 2</h3>
            <p>Description for Slide 2</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x400?text=Slide+3"
            alt="Slide 3"
          />
          <Carousel.Caption>
            <h3>Slide 3</h3>
            <p>Description for Slide 3</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <h2 className="mt-5">Featured Products</h2>
      <Row>
        {featuredProducts.map((product, index) => (
          <Col key={index} sm={4} className="mt-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.discount ? 'On Discount' : 'Regular Price'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h2 className="mt-5">Featured Services</h2>
      <Row>
        {featuredProducts.map((product, index) => (
          <Col key={index} sm={4} className="mt-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.discount ? 'On Discount' : 'Regular Price'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h2 className="mt-5">Featured Shops</h2>
      <Row>
        {featuredProducts.map((product, index) => (
          <Col key={index} sm={4} className="mt-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.discount ? 'On Discount' : 'Regular Price'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CustomerHome