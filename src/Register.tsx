

import { useState } from 'react';
import { Modal } from 'react-bootstrap';

function Register() {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleFormSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Registered');
        handleClose();
    };

    return (
        <>
            <button type="button" onClick={handleShow} className="btn btn-primary">
                Register
            </button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleFormSubmit}>
                        <h3>Hello, please register </h3>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Full name
                            </label>
                            <input
                                type="string"
                                className="form-control"
                                id="name"
                                aria-describedby="name"
                            />
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
                            <label htmlFor="password"
                                className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">
                                Age
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="age"
                                min={0}
                                max={120}
                            />
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
