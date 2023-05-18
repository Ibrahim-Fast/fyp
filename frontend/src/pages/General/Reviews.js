
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const Review = ({ name, date, rating, comment }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Row className="align-items-center">
          <Col sm={2}>
            <img
              src="https://via.placeholder.com/64"
              alt="User Avatar"
              className="rounded-circle"
            />
          </Col>
          <Col sm={10}>
            <h5>{name}</h5>
            <p className="text-muted">{date}</p>
            <p>{comment}</p>
            <div className="d-flex">
              {Array(rating)
                .fill()
                .map((_, index) => (
                  <FaStar key={index} className="text-warning mr-1" />
                ))}
              {Array(5 - rating)
                .fill()
                .map((_, index) => (
                  <FaStar key={index} className="mr-1" />
                ))}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const ReviewPage = () => {
  const reviews = [
    {
      name: 'Ahmed Khan',
      date: '10th May, 2023',
      rating: 5,
      comment: 'The tailored suit I received was absolutely perfect. The fit, the fabric, everything exceeded my expectations. Highly recommended!',
    },
    {
      name: 'Salman Malik',
      date: '15th May, 2023',
      rating: 4,
      comment: 'I recently purchased a custom shirt from this tailor eCommerce website. The craftsmanship is impressive, and the shirt fits me well. The only reason I give 4 stars is because the shipping took longer than expected.',
    },
  ];

  return (
    <Container>
      <h1>Customer Reviews</h1>
      {reviews.map((review, index) => (
        <Review key={index} {...review} />
      ))}
    </Container>
  );
};

export default ReviewPage;


