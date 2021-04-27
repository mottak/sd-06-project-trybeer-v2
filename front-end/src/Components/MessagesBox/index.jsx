import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TiArrowBack } from 'react-icons/ti';

function MessagesBox({ messages, pathname, clientEmail }) {
  return (
    <ul>
      { pathname.includes('admin') && (
        <Link to="/admin/chats" data-testid="back-button">
          <TiArrowBack />
          <p>{ `Conversando com ${clientEmail}` }</p>
        </Link>
      ) }
      { messages.length === 0
        ? <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>
        : messages.map(({ message, email, timestamp, role }, index) => (
          <li key={ index } className={ role }>
            <span data-testid="nickname">
              { role === 'administrator' ? 'Loja' : email }
            </span>
            { ' - ' }
            <span data-testid="message-time">{ timestamp }</span>
            <p data-testid="text-message">{ message }</p>
          </li>
        )) }
    </ul>
  );
}

MessagesBox.defaultProps = {
  clientEmail: null,
};

MessagesBox.propTypes = {
  messages: PropTypes.instanceOf(Array).isRequired,
  pathname: PropTypes.string.isRequired,
  clientEmail: PropTypes.string,
};

export default MessagesBox;
