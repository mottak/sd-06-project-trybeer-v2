import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';

import AppContext from '../context/app.context';
import api from '../services';

import { Topbar, MessageInput, ChatMessage } from '../components';

export default function Chat() {
  const { tokenContext: { token } } = useContext(AppContext);

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const ENDPOINT = 'http://localhost:4001';
  const options = useMemo(() => ({ auth: { token } }), [token]);
  const socket = useMemo(() => api.chat(ENDPOINT, options), [options]);

  const sendMessage = useCallback((e) => {
    e.preventDefault();
    const newMessage = { nickname: token.email, message, timestamp: new Date() };
    socket.emit('chat:clientMessage', { msg: newMessage, token });
    setMessage('');
  }, [message, socket, token]);

  useEffect(() => {
    socket.emit('user:login', token.token);
  }, [socket, token]);

  const getMessage = useCallback(({ target }) => setMessage(target.value), []);

  socket.on('chat:serverMessage', (msg) => {
    setMessageList([...messageList, msg]);
  });

  api.chat.on('server:storedMessages', (msgs) => {
    setMessageList(msgs);
  });

  const title = 'Atendimento';

  return (
    <div>
      <Topbar title={ title } />
      <MessageInput
        callback={ getMessage }
        sendMessage={ sendMessage }
        value={ message }
      />
      { messageList.map((msg, i) => (
        <ChatMessage msg={ msg } key={ i } client={ token.email } />
      )) }
    </div>
  );
}
