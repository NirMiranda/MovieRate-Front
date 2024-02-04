import { useState } from 'react';
import axios from 'axios';
import { Modal, Alert } from 'react-bootstrap';
import './Login.css';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';



function Login() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleRegisterClick = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const target = e.currentTarget as typeof e.currentTarget & {
                email: { value: string };
                password: { value: string };
            };

            const response = await axios.post('http://localhost:3003/auth/login', {
                email: target.email.value,
                password: target.password.value,
            });

            const { accessToken, refreshToken, user } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/Profile';

            setValidationError(null); // Clear any previous validation errors

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // Handle specific errors based on status code
                    if (error.response.status === 406) {
                        setValidationError('Email does not exist or incorrect password.');
                    } else {
                        setValidationError('An error occurred during login. Please try again.');
                    }
                } else {
                    console.error('Network error or server is unreachable:', error);
                    setValidationError('Network error or server is unreachable. Please try again.');
                }
            } else {
                console.error('Unexpected error during login:', error);
                setValidationError('An unexpected error occurred. Please try again.');
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
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-5px' }}>
                <button type="button" onClick={handleRegisterClick} className="loginBtn" style={{ marginRight: '0px' }}>
                    Login
                </button>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {validationError && (
                        <Alert variant="danger" onClose={() => setValidationError(null)} dismissible>
                            {validationError}
                        </Alert>
                    )}
                    <form onSubmit={handleFormSubmit}>
                        <h3>Hello, please login</h3>
                        <div className="mb-3"  style={{display:'contents'}}>
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                name="email"
                                aria-describedby="emailHelp"
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="mb-3"  style={{display:'contents'}}>
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                            />
                        </div>
                        <button type="submit" className="btn btn-dark" style={{marginTop:'10px'}}>
                            Submit
                        </button>
                        <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Login;
