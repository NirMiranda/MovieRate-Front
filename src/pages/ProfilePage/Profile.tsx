// Import statements (similar to your existing imports)
import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button as MuiButton, TextField, Box, Slider } from '@mui/material'; // Import Material-UI Button
import axios from 'axios';
import MovieReviews, { ReviewType } from '../../components/MovieReviews/MovieReviews';
import UploadMovieModal from '../../components/UploadMovie/UploadMovie'
import UserMovies from '../../components/UserMovies/UserMovies';
import { movie } from  '../MoviesPage/MoviesPage';




export // Interface definition for user details
interface UserType {
    _id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    reviews: ReviewType[];
    moviesUploaded: movie[];
    photo: string;
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
    background-color: black;
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

// Main functional component
function Profile() {
    const [user, setUser] = useState<UserType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddMovieModalOpen, setAddMovieModalOpen] = useState(false); // Add this line
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedGender, setSelectedGender] = useState<string>('default');
    const [isGoogleSignIn, setIsGoogleSignIn] = useState<boolean | null>(null);
    const [showNoUserMessage, setShowNoUserMessage] = useState(false); // New state variable


    // useEffect to fetch user details on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const refreshToken = localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    console.error('Unauthorized: Missing refreshToken');
                    return;
                }

                const response = await axios.get('https://10.10.248.175/user/token', {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });

                setUser(response.data.user);
                setIsGoogleSignIn(localStorage.getItem('isGoogleSignIn') === 'true');
                

            } catch (error: any) {
                console.log('Failed to fetch user details:', error);
                if (error.response && error.response.status === 401) {
                    setShowNoUserMessage(true);
                }
            }
        };

        if (localStorage.getItem('refreshToken')) {
            fetchUserDetails();
        }
        else {
            setShowNoUserMessage(true);
        }
    }, []);

    // Handler for updating user details
    const handleUpdateButton = async () => {
        try {
            const updatedUser = {
                ...user,
                name: String(user?.name),
            };

            if (updatedUser.name.trim() === '') {
                setErrorMessage('The name must contain letters');
                return;
            }

            if (user?.password !== undefined) {
                updatedUser.password = user.password.trim();
            } else {
                delete updatedUser.password;
            }

            const response = await axios.put(`https://10.10.248.175/user/${user?._id}`, updatedUser);

            if (response.status === 200) {
                console.log('User updated successfully');
                setIsEditMode(false);
                setErrorMessage(null);
            }
        } catch (error) {
            console.error('Failed to update user:', error);

            if (error.response?.data?.error.includes('fails to match the required pattern: /^[a-zA-Z\\s]+$/')) {
                setErrorMessage('The name must be in characters in English');
            } else {
                setErrorMessage(error.response?.data?.error || 'Failed to update user');
            }
        }
    };

    // Handler for input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((prevUser) => ({
            ...(prevUser as UserType),
            [name]: value,
        }));
        setErrorMessage(null);
    };

    // Handler for gender selection change
    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGender(e.target.value);
    };

    const handleAddMovieButtonClick = () => {
        setAddMovieModalOpen(true);
    };
    
    // JSX structure
    return (
        <ProfileContainer>
                 {showNoUserMessage && (
                <p style={{ color: 'red',marginTop:'100px' }}>No user logged in. Please log in.</p>
            )}

            {!showNoUserMessage && (
                <>
            <Card>
                {user && (
                    <>
                        <h2>Gender</h2>
                        <GenderSelector value={selectedGender} onChange={handleGenderChange}>
                            <option value="default">both</option>
                            <option value="woman">Woman</option>
                            <option value="man">Man</option>
                            <option value="myimage">my image</option>
                        </GenderSelector>
    
                        <CardImage
                            src={
                                selectedGender === 'woman'
                                    ? 'https://cdn.icon-icons.com/icons2/1999/PNG/512/avatar_people_person_profile_user_woman_icon_123357.png'
                                    : selectedGender === 'myimage'
                                    ? user?.photo
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
                            {(isEditMode && !isGoogleSignIn) ? (
                                <input type="text" name="email" value={user.email} onChange={handleChange} />
                            ) : (
                                user.email
                            )}
                        </p>
                        {(!isGoogleSignIn || (isEditMode && !isGoogleSignIn)) && (
                            <>
                                <p>
                                    Age:{' '}
                                    {(isEditMode && !isGoogleSignIn) ? (
                                        <input type="number" name="age" value={user.age} onChange={handleChange} />
                                    ) : (
                                        `${user.age}`
                                    )}
                                </p>
                                <p>
                                    Password:{' '}
                                    {(isEditMode && !isGoogleSignIn) ? (
                                        <input type="password" name="password" value={user.password} onChange={handleChange} />
                                    ) : (
                                        '*******'
                                    )}
                                </p>
                            </>
                        )}
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

            <div style={{justifyContent:'center'}}><h2 style={{ textAlign: 'center', marginTop: '20px' }}>Your Reviews</h2></div>
            
                
            <MovieReviews reviews={user?.reviews ?? []} />
            </>
            )}

        </ProfileContainer>
    );
}

export default Profile;
