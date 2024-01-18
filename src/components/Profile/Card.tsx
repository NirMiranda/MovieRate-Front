// Card.tsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  text-align: center;
  font-family: arial;
  margin: 10px; /* Added margin */
`;

const Image = styled.img`
  width: 100%;
  max-width: 200px;
  filter: grayscale(0%) brightness(100%) contrast(100%) sepia(0%);
  margin-top: 20px;
`;

const Title = styled.h1`
  color: grey;
  font-size: 18px;
`;

const Card = () => {
  return (
    <Container>
      <Image src="https://img.icons8.com/plasticine/2x/test-account.png" alt="John" />
      <Title>John Doe</Title>
      <p>CEO & Founder, Example</p>
      <p>Harvard University</p>
    </Container>
  );
}

export default Card;
