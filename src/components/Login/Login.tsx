import { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import './Login.css';

function Login() {
    const [showModal, setShowModal] = useState(false);

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

            handleClose();
        } catch (error) {
            console.log('Login failed:', error);
        }
    };

    return (
        <>  
            <div style={{display:'flex',justifyContent:'center',marginBottom:'-5px'}}>
            <button type="button" onClick={handleRegisterClick} className="loginBtn" style={{marginRight:'0px'}} >
                Login
            </button>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleFormSubmit}>
                        <h3>Hello, please login</h3>
                        <div className="mb-3">
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
                        <div className="mb-3">
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
                        <button type="submit" className="btn btn-dark">
                            Submit
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Login;
