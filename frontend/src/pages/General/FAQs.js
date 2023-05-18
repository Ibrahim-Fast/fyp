
// import React from 'react';

// const FAQs = () => {


//   return (
//     <div>FAQs</div>
//   )
// }

// export default FAQs

import React, { useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';

const FAQPage = () => {
  const faqs = [
    {
      question: 'How can I place an order?',
      answer: 'To place an order, browse our collection, select the desired product, choose your measurements, and add it to your cart. Proceed to checkout and provide your shipping details to complete the order.',
    },
    {
      question: 'Can I customize the measurements?',
      answer: 'Yes, we offer customization options for measurements. During the order process, you can provide your specific measurements or select from standard sizes.',
    },
    {
      question: 'What is the estimated delivery time?',
      answer: 'The delivery time varies depending on the product and customization. Generally, it takes around 2-4 weeks for us to craft and deliver your tailored item.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods, including credit/debit cards, PayPal, and bank transfers. You can choose your preferred payment option during the checkout process.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'No.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We strive for customer satisfaction. If there are any issues with your order, please contact our customer support within 14 days of receiving the product. We shall assist you with returns, exchanges, or refunds based on the specific situation.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container>
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <Card key={index} className="mb-3" variant='success' bg='success' as={Button} onClick={() => toggleFAQ(index)}
          aria-expanded={activeIndex === index}
        >
          <Card.Header>
            <b style={{color:'black'}}>
              {(index + 1) + ')'}{faq.question}
            </b>
          </Card.Header>
          {activeIndex === index && (
            <Card.Body>
              <p style={{color:'black'}}>{faq.answer}</p>
            </Card.Body>
          )}
        </Card>
      ))}
    </Container>
  );
};

export default FAQPage;
