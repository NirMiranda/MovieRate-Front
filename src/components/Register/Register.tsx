import React, { useState, FormEvent } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [showModal, setShowModal] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
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
            // Check if age is within the valid range
            const ageValue = parseInt(age, 10);
            if (ageValue < 6 || ageValue > 120) {
                setValidationError('Age must be between 6 and 120.');
                return;
            }

            // Registration request
            const registrationResponse = await axios.post<{ data: string }>('http://localhost:3003/auth/register', {
                name,
                email,
                password,
                age
            });

            console.log('Registered successfully:', registrationResponse.data.data);

            const newUser = {
                name,
                email,
                age,
            };

            localStorage.setItem('user', JSON.stringify(newUser));

            setValidationError('Registration successful!');

            // Login request after successful registration
            const loginResponse = await axios.post('http://localhost:3003/auth/login', {
                email,
                password,
            });

            const { accessToken, refreshToken, user } = loginResponse.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
           

            // Close the modal after a delay (you can adjust the delay as needed)
            setTimeout(() => {
                handleClose();
                setValidationError(null); // Clear the success message
            }, 2000); // Example: Close after 2 seconds
            navigate('/Movies');
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.error) {
                    // Check if the error is related to the "name" validation pattern
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

    return (
        <>
            <button type="button" onClick={handleShow} className="registerBtn" style={{marginRight:'0px'}}>
                Register
            </button>

            <Modal show={showModal} onHide={handleClose}>
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
                        <div className="mb-3">
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

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input type="password" className="form-control" id="password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">
                                Age
                            </label>
                            <input type="number" className="form-control" id="age" min={0} max={120} />
                        </div>
                        <button type="submit" className="btn btn-dark">
                            Register
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Register;
