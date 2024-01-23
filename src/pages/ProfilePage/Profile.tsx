import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MovieReviews,{ReviewType} from '../../components/MovieReviews/movieReviews';

interface UserType {
    _id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    reviews: ReviewType[];
}

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
    font-family: 'Gill Sans', sans-serif;
    margin-top: 10px; /* Added margin-top */
`;

function Profile() {
    const [user, setUser] = useState<UserType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const refreshToken = localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    console.error('Unauthorized: Missing refreshToken');
                    return;
                }

                const response = await axios.get('http://localhost:3003/user/token', {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });

                setUser(response.data.user);
                console.log('User Reviews:', response.data.user.reviews);
            } catch (error) {
                console.log('Failed to fetch user details:', error);
            }
        };
        
        fetchUserDetails();
    }, []);

    const handleUpdateButton = async () => {
        try {
            // Send Axios request to update user details
            const response = await axios.put(`http://localhost:3003/user/${user?._id}`, user);

            if (response.status === 200) {
                console.log('User updated successfully');
                // Optionally, you can update the local state with the new details
                setIsEditMode(false);
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update the state when the input values change
        setUser((prevUser) => ({
            ...(prevUser as UserType),
            [e.target.name]: e.target.value,
        }));
    };
    return (
        <ProfileContainer>
            <Card>
                {/* Display user details */}
                {user && (
                    <>
                        <CardImage src="https://img.icons8.com/plasticine/2x/test-account.png" alt={user.name} />
                        <Title>
                           Name: {isEditMode ? (
                                <input type="text" name="name" value={user.name} onChange={handleChange} />
                            ) : (
                                user.name
                            )}
                        </Title>
                        <p>
                            Email: {isEditMode ? <input type="text" name="email" value={user.email} onChange={handleChange} /> : user.email}
                        </p>
                        <p> Age: {isEditMode ? <input type="number" name="age" value={user.age} onChange={handleChange} /> : `Age: ${user.age}`}</p>
                        <p>
                            Password: {isEditMode ? <input type="password" name="password" value={user.password} onChange={handleChange} /> : '*******'}
                        </p>
                        {/* Add other user details as needed */}
                    </>
                )}
                {isEditMode ? (
                    <Button onClick={handleUpdateButton}>Save</Button>
                ) : (
                    <Button onClick={() => setIsEditMode(true)}>Update</Button>
                )}
            </Card>
            <MovieReviews reviews={user?.reviews ?? []} />
        </ProfileContainer>
    );
}

export default Profile;
