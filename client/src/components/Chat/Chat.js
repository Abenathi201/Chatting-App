import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'qs';
import io from 'socket.io-client';

import './Chat.css';

import InforBar from '../InfoBar/InforBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';

let socket;

const Chat = () => {
    const location = useLocation();
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPOINT = "http://localhost:5000/";

    useEffect(() => {
        if (location?.search) {
            const { name, room } = queryString.parse(location.search, { ignoreQueryPrefix: true });

            socket = io(ENDPOINT);

            setName(name);
            setRoom(room);

            // console.log(socket);
            socket.emit('join', { name, room }, () => {});

            return () => {
                socket.emit('disconnect');

                socket.off();
            }
        }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                {/* <
                    input value={message} onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                /> */}
                <InforBar room={ room } />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;