import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MovieReviews, { ReviewType } from '../../components/MovieReviews/movieReviews';

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
    flex-direction: column;
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
    margin-top: 10px;
`;

function Profile() {
    const [user, setUser] = useState<UserType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
            } catch (error) {
                console.log('Failed to fetch user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleUpdateButton = async () => {
        try {
            // Convert the "Name" field to a string before sending the request
            const updatedUser = {
                ...user,
                name: String(user?.name),
            };

            // Additional check for space character in the name
            if (updatedUser.name.trim() === '') {
                setErrorMessage('The name must contain letters');
                return;
            }

            // Conditionally update the password
            if (user?.password !== undefined) {
                updatedUser.password = user.password.trim(); // Trim whitespace from the password
            } else {
                // If the password field is empty or undefined, remove it from the request
                delete updatedUser.password;
            }

            // Send Axios request to update user details
            const response = await axios.put(`http://localhost:3003/user/${user?._id}`, updatedUser);

            if (response.status === 200) {
                console.log('User updated successfully');
                setIsEditMode(false);
                setErrorMessage(null); // Clear any previous error message
            }
        } catch (error) {
            console.error('Failed to update user:', error);

            // Check for specific error messages
            if (error.response?.data?.error.includes('fails to match the required pattern: /^[a-zA-Z\\s]+$/')) {
                setErrorMessage('The name must be in characters');
            } else {
                setErrorMessage(error.response?.data?.error || 'Failed to update user');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update the state when the input values change
        setUser((prevUser) => ({
            ...(prevUser as UserType),
            [name]: value,
        }));
        setErrorMessage(null); // Clear the error message when the user edits the input
    };

    return (
        <ProfileContainer>
            <Card>
                {/* Display user details */}
                {user && (
                    <>
                        <CardImage src="https://img.icons8.com/plasticine/2x/test-account.png" alt={user.name} />
                        <Title>
                            Name:{' '}
                            {isEditMode ? (
                                <input type="text" name="name" value={user.name} onChange={handleChange} />
                            ) : (
                                user.name
                            )}
                        </Title>
                        <p>
                            Email:{' '}
                            {isEditMode ? (
                                <input type="text" name="email" value={user.email} onChange={handleChange} />
                            ) : (
                                user.email
                            )}
                        </p>
                        <p>
                            Age:{' '}
                            {isEditMode ? (
                                <input type="number" name="age" value={user.age} onChange={handleChange} />
                            ) : (
                                `${user.age}`
                            )}
                        </p>
                        <p>
                            Password:{' '}
                            {isEditMode ? (
                                <input type="password" name="password" value={user.password} onChange={handleChange} />
                            ) : (
                                '*******'
                            )}
                        </p>
                        {/* Add other user details as needed */}
                    </>
                )}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
