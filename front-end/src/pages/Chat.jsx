import React, { useEffect, useState } from 'react';
import ChatMessage from '../components/ChatMessage';
import TopBar from '../components/TopBar';
import socket from '../utils/socketClient';
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import '../styles/chat.css';

function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const { email, role } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    socket.emit('getMessages', { email });
  }, []);

  useEffect(() => {
    socket.on('message', (data) => {
      setChatMessages([...data]);
    });
  }, [chatMessages]);

  const handleSubmit = () => {
    const nickname = role === 'administrator' ? 'Loja' : email;
    const messageToSend = {
      nickname,
      message,
      email,
    };

    socket.emit('message', messageToSend);
    setMessage('');
  };

  const handleChange = (e) => setMessage(e.target.value);

  return (
    <div>
      <TopBar name="TryBeer" />
      <div className="chatmaincontainer">
        <div className="margintop"> 
          <div className="chatmessage">
            <ul>
              {chatMessages.map((chatMessage, index) => (
                <ChatMessage
                  key={ index }
                  nickname={ chatMessage.nickname }
                  message={ chatMessage.message }
                  timestamp={ chatMessage.timestamp }
                />
              ))}
            </ul>
          </div>
          <div className="submitmessage">
            <input 
              data-testid="message-input" 
              value={ message } 
              onChange={ handleChange } 
              className="inputmenssage"
              placeholder="Digite sua menssagem ..."
            />
            < IoArrowForwardCircleOutline
              data-testid="send-message"
              onClick={ handleSubmit } 
              size= { 40 }
              color="#e9925c"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
