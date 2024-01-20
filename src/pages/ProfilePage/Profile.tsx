// Profile.tsx
import React from 'react';
import styled from 'styled-components';
import ReviewTable from '../../components/Profile/ReviewTable'; // Adjust the path accordingly

const ProfileContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column; /* Adjusted flex-direction */
  align-items: center;
  padding: 20px;
`;

const Card = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  text-align: center;
  font-family: arial;
  margin: 10px;
`;

const CardImage = styled.img`
  width: 100%;
  max-width: 200px;
  filter: grayscale(0%) brightness(100%) contrast(100%) sepia(0%);
  margin-top: 20px;
`;

const Title = styled.h1`
  color: grey;
  font-size: 18px;
`;

const Button = styled.button`
  border: none;
  outline: 0;
  display: inline-block;
  padding: 10px;
  color: white;
  background-color: gray;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  border-radius: 50%;
  font-family: "Gill Sans", sans-serif;
  margin-top: 10px; /* Added margin-top */
`;

function Profile() {
  return (
    <ProfileContainer>
      <Card>
        {/* Rest of the card content */}
        <CardImage src="https://img.icons8.com/plasticine/2x/test-account.png" alt="John" />
        <Title>John Doe</Title>
        <p>CEO & Founder, Example</p>
        <p>Harvard University</p>
        <Button>Update</Button>
      </Card>

      <ReviewTable />
    </ProfileContainer>
  );
}

export default Profile;
