import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./socket.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'react-bootstrap';

const Socket = () => {
    const [messageList, setMessageList] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [showMessages, setShowMessages] = useState(false); // State to manage visibility of messages
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const newSocket = io("http://localhost:5173", {
            transports: ["websocket"],
        });

        newSocket.on("connect", function () {
            console.log("Connected to socket.io server");
        });

        newSocket.on("message", function (messageData) {
            console.log("Received message:", messageData);
            appendMessage(messageData.message, messageData.timestamp);
        });

        // Set the socket in state
        setSocket(newSocket);

        // Retrieve message history from local storage
        const storedMessages = JSON.parse(localStorage.getItem('messageHistory'));
        if (storedMessages) {
            setMessageList(storedMessages.map((msg: { message: string; timestamp: string | number | Date; }) => ({
                message: msg.message,
                timestamp: new Date(msg.timestamp) // Convert stored timestamp to Date object
            })));
        }

        // Clean up the socket connection on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Save message history to local storage whenever it changes
        localStorage.setItem('messageHistory', JSON.stringify(messageList));
    }, [messageList]);

    const appendMessage = (message: string, timestamp: Date) => {
        const newMessageList = [...messageList, { message, timestamp }];
        setMessageList(newMessageList);
    };

    const formatTime = (date: { getHours: () => string; getMinutes: () => string; }) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < "10" ? "0" : ""}${minutes}`;
    };

    const sendMessage = () => {
        if (messageInput.trim() !== "" && socket) {
            const email = localStorage.getItem('email');
            const username = localStorage.getItem('username'); // Retrieve username from local storage
            const messageData = {
                message: (username ? username : email) + ": " + messageInput, // Use username if available, otherwise fallback to email
                timestamp: new Date().getTime() // Get current timestamp
            };
            socket.emit("message", messageData); // Send message with timestamp
            setMessageInput("");
            // Manually append message to own chat immediately
            appendMessage(messageData.message, new Date(messageData.timestamp));
        }
    };

    const clearMessages = () => {
        setMessageList([]);
        // Optionally, you can also clear the chat input field and hide the messages here
        setMessageInput("");
        setShowMessages(false);
    };

    return (
        <div>
            <Button className='chat' onClick={handleShow}>
                Chat
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>MoView Members Chat</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{ marginBottom: "20px" }}>
                    <button className="showmessege" onClick={() => setShowMessages(!showMessages)}>Show Messages</button>
                    <button className="clearmessages" onClick={clearMessages}>Clear All Messages</button>
                    {showMessages && (
                        <div>
                            <ul className="message-list">
                                {messageList.map((item, index) => (
                                    <li key={index} className={`message ${item.message.startsWith(localStorage.getItem('email')) ? 'own-message' : 'other-message'}`}>
                                        <span className="message-time">{formatTime(item?.timestamp)}</span>
                                        <div className="message-text">
                                            <h4>{item?.message}</h4>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="massegeboxbtn" style={{ position: "fixed", bottom: "0", top: "10" }}>
                        <input className='text' type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                        <button className="send" onClick={sendMessage}>Send</button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Socket;
