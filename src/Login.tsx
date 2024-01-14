

import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './Login.css';

function Login() {
    const [showModal, setShowModal] = useState(false);

    const handleRegisterClick = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Login submitted');
        handleClose();
    };

    return (
        <>
            <button type="button" onClick={handleRegisterClick} className="btn btn-primary">
                Login
            </button>

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
