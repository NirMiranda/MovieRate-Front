import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./socket.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'react-bootstrap';
export type timeMessage = {
    message: string
    timestamp: string
}
const newSocket = io("http://localhost:3003", {
    transports: ["websocket"],
});
const Socket = () => {
    const [messageList, setMessageList] = useState<timeMessage[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [showMessages, setShowMessages] = useState(false); // State to manage visibility of messages
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        newSocket.on("connect", function () { console.log("Connected to socket.io server"); });
        // Set the socket in state
        setSocket(newSocket);
        // Retrieve message history from local storage
        const storedMessages = JSON.parse(localStorage.getItem('messageHistory'));
        console.log("stored messages:", storedMessages);
        // Filter out invalid messages with NaN timestamps
        const validatedMessages = storedMessages?.filter((message: any) => (
            typeof message === 'object' && message !== null && !isNaN(new Date(message.timestamp).getTime())
        ));
        if (validatedMessages) { setMessageList(validatedMessages); }
        // Clean up the socket connection on component unmount
        return () => { newSocket.disconnect(); };
    }, []);
    useEffect(() => {
        console.log("my message list:", messageList);
        // Save message history to local storage whenever it changes
        localStorage.setItem('messageHistory', JSON.stringify(messageList));

        newSocket.on("message", function (messageData) {
            console.log("Received message:", messageData);
            appendMessage(messageData.message, messageData.timestamp);
        });
    }, [messageList]);


    const appendMessage = (message: string, timestamp: string) => {
        const newMessageList = [...messageList, { message, timestamp }];
        console.log("newMessageList: ", newMessageList)
        setMessageList(newMessageList);
    };
    const formatTime = (date: string) => {
        const mydate = new Date(date);
        const year = mydate.getFullYear();
        const month = ('0' + (mydate.getMonth() + 1)).slice(-2);
        const day = ('0' + mydate.getDate()).slice(-2);
        const hours = ('0' + mydate.getHours()).slice(-2);
        const minutes = ('0' + mydate.getMinutes()).slice(-2);
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const sendMessage = () => {
        if (messageInput.trim() !== "" && socket) {
            const user = localStorage.getItem('user');
            console.log("user: ", user);
            const userData = JSON.parse(user);
            const { _id, name, email } = userData;
            console.log("_id: ", _id);
            console.log("name: ", name);
            console.log("email: ", email);
            let messageData = {}
            if (name != null) {
                messageData = {
                    message: name + ": " + messageInput,
                    timestamp: new Date().getTime()
                };
            }
            else if (email != null) {
                messageData = {
                    message: email + ": " + messageInput,
                    timestamp: new Date().getTime()
                };
            }
            else {
                messageData = {
                    message: "Guest: " + messageInput,
                    timestamp: new Date().getTime()
                };
            }

            socket.emit("message", messageData);
            setMessageInput("");
        }
    };

    const clearMessages = () => {
        setMessageList([]);
        localStorage.removeItem('messageHistory');
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
                    <button className="clearmessages" onClick={clearMessages}>Clear Chat From Messages</button>
                    {showMessages && (
                        <div>
                            <ul className="message-list">
                                {messageList.map((item, index) => (
                                    <li key={index} className={`message ${item.message?.startsWith(localStorage.getItem('user')) ? 'own-message' : 'other-message'}`}>
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