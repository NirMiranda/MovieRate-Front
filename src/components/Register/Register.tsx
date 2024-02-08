import React, { useState, FormEvent } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function Register() {
    const [showModal, setShowModal] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleShow = () => {
        setShowModal(true);
        setValidationError(null);
    };

    const handleClose = () => setShowModal(false);

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('exampleInputEmail1') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const age = (document.getElementById('age') as HTMLInputElement).value;

        try {
            const ageValue = parseInt(age, 10);
            if (ageValue < 6 || ageValue > 120) {
                setValidationError('Age must be between 6 and 120.');
                return;
            }

            const registrationResponse = await axios.post<{ data: string }>('http://localhost:3003/auth/register', {
                name,
                email,
                password,
                age,
                fileUrl,
            });

            console.log('Registered successfully:', registrationResponse.data.data);

            const newUser = {
                name,
                email,
                age,
            };

            localStorage.setItem('user', JSON.stringify(newUser));

            setValidationError('Registration successful!');

            const loginResponse = await axios.post('http://localhost:3003/auth/login', {
                email,
                password,
            });

            const { accessToken, refreshToken, user } = loginResponse.data;

            if (user.photo) {
                try {
                    const fileResponse = await axios.post<{ url: string }>('http://localhost:3003/file', {
                        file: user.photo,
                    });

                    const updatedUser = {
                        ...user,
                        photo: fileResponse.data.url,
                    };

                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } catch (fileError) {
                    console.error('Failed to update fileUrl:', fileError);
                }
            }

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/Movies');

            setTimeout(() => {
                handleClose();
                setValidationError(null);
            }, 2000);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.error) {
                    if (error.response.data.error.includes('fails to match the required pattern: /^[a-zA-Z\\s]+$/')) {
                        setValidationError('The name must consist of letters only.');
                    } else {
                        setValidationError(error.response.data.error);
                    }
                } else {
                    console.error('Registration failed:', error.message);
                }
            } else {
                console.error('Registration failed:', error);
            }
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const uploadResponse = await axios.post<{ url: string }>('http://localhost:3003/file', formData);
                setFileUrl(uploadResponse.data.url);
            } catch (uploadError) {
                console.error('File upload failed:', uploadError);
                setFileUrl(null);
            }
        }
    };

    const onGoogleLoginSuccess = async (response: any) => {
        console.log(response);
    
        const { credential } = response;
        try {
            const googleResponse = await axios.post('http://localhost:3003/auth/google', {
                credential,
            });
    
            const { accessToken, refreshToken, user } = googleResponse.data;
          
    
            if (user.photo) {
                try {
                    const fileResponse = await axios.post<{ url: string }>('http://localhost:3003/file', {
                        file: user.photo,
                    });
    
                    const updatedUser = {
                        ...user,
                        photo: fileResponse.data.url,
                    };
    
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } catch (fileError) {
                    console.error('Failed to update fileUrl:', fileError);
                }
            }

            delete user.age;
            delete user.password;
            
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('isGoogleSignIn','true');

    
            // Provide feedback to the user
            setValidationError('Google registration successful!');
    
            const tokenResponse = await axios.get('http://localhost:3003/user/token', {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
    
            console.log('User obtained using accessToken:', tokenResponse.data.user);
    
            // Optionally, you can navigate to the Movies page or close the modal
            navigate('/Movies');
            window.location.reload();
        } catch (error) {
            console.error('Google registration failed:', error);
    
            // Update the UI with an error message (you can add state for this)
            setValidationError('Google registration failed');
        }
    };

    const onGoogleLoginFailure = () => {
        console.log('Google login failed');
    };

    return (
        <>
            <button type="button" onClick={handleShow} className="registerBtn" style={{ marginRight: '0px' }}>
                Register
            </button>

            <Modal show={showModal} onHide={handleClose} dialogClassName={"modalDialog"}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {validationError && (
                        <Alert variant="danger" onClose={() => setValidationError(null)} dismissible>
                            {validationError}
                        </Alert>
                    )}
                    <form onSubmit={handleFormSubmit}>
                        <h3>Hello, please register</h3>
                        <div className="mb-3" style={{display:'contents'}}>
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Full name
                            </label>
                            <input type="text" className="form-control" id="name" aria-describedby="name" />
                        </div>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>

                        <div className="mb-3" style={{display:'contents'}}>
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <div className="mb-3"  style={{display:'contents'}}>
                            <label htmlFor="age" className="form-label">
                                Age
                            </label>
                            <input type="number" className="form-control" id="age" min={0} max={120} />
                        </div>

                        <div className="mb-3"  style={{display:'contents'}}>
                            <label htmlFor="file" className="form-label">
                                Profile Photo
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-dark" style={{marginTop:'10px'}}>
                            Register
                        </button>
                        <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Register;
