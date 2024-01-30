import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button as MuiButton, TextField, Box, Slider } from '@mui/material'; // Import Material-UI Button
import axios from 'axios';
import MovieReviews, { ReviewType } from '../../components/MovieReviews/movieReviews';
import UploadMovieModal from '../../components/UploadMovie/UploadMovie'
import UserMovies from '../../components/UserMovies/UserMovies';
import { movie } from  '../MoviesPage/MoviesPage';




export interface UserType {
    _id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    reviews: ReviewType[];
    moviesUploaded: movie[];
    photo:string;
}

const StyledMuiButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <MuiButton
        variant="contained"
        style={{
            backgroundColor: 'green',
            color: 'white',
            borderRadius: '50%',
            marginTop: '10px',
            fontSize: '12px',
        }}
        onClick={onClick}
    >
        {children}
    </MuiButton>
);

const ProfileContainer = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color:black;
`;

const Card = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 200px;
    text-align: center;
    font-family: arial;
    margin: 10px;
`;

const CardImage = styled.img`
    width: 100%;
    max-width: 200px;
    filter: grayscale(0%) brightness(100%) contrast(100%) sepia(0%);
    margin-top: 20px;
    border-radius: 50%;
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

const GenderSelector = styled.select`
    margin-top: 10px;
    padding: 5px;
`;

function Profile() {
    const [user, setUser] = useState<UserType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMovieModalOpen, setAddMovieModalOpen] = useState(false); // Add this line
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedGender, setSelectedGender] = useState<string>('default');

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

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGender(e.target.value);
    };

    const handleAddMovieButtonClick = () => {
        setAddMovieModalOpen(true);
    };

    return (
        <ProfileContainer>
            <Card>
                {/* Display user details */}
                {user && (
                    <>
                        {/* Gender Selector */}
                        <h2>Gender</h2>
                        <GenderSelector value={selectedGender} onChange={handleGenderChange}>
                            <option value="default">both</option>
                            <option value="woman">Woman</option>
                            <option value="man">Man</option>
                            <option value="myimage" >my image</option>
                        </GenderSelector>

                        <CardImage
             src={
             selectedGender === 'woman'
            ? 'https://cdn.icon-icons.com/icons2/1999/PNG/512/avatar_people_person_profile_user_woman_icon_123357.png'
            : selectedGender === 'myimage'
            ? user?.photo // Use user.photo if available, otherwise a default image
            : selectedGender === 'man'
            ? 'https://cdn.icon-icons.com/icons2/1999/PNG/512/avatar_nurse_people_person_profile_user_icon_123369.png'
            : 'https://img.icons8.com/plasticine/2x/test-account.png'
           }
           alt={user?.name}
/>
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
                <StyledMuiButton onClick={handleAddMovieButtonClick}>Upload your own movie</StyledMuiButton>
            </Card>


            <UploadMovieModal isOpen={isAddMovieModalOpen} onClose={() => setAddMovieModalOpen(false)} />

            <UserMovies userId={user?._id ?? ''} />

            <div style={{justifyContent:'center'}}><h2 style={{ textAlign: 'center', marginTop: '20px' }}>User's Reviews</h2></div>
            
            
            <MovieReviews reviews={user?.reviews ?? []} />

        </ProfileContainer>
    );
}

export default Profile;
