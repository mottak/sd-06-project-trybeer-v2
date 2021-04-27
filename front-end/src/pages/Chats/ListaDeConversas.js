import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

export default function ListaDeConversas() {
  const [users, setUsers] = useState([]);

  const callAllMessages = async () => {
    const allMessages = await fetch('http://localhost:4001/chat/messages');
    const allMsg = await allMessages.json();
    const teste = allMsg.filter((el) => el._id !== 'Loja');
    setUsers(teste);
  };

  useEffect(() => {
    callAllMessages();
  }, []);

  return (
    <div>
      <Header title="TryBeer" user="admin" />
      {users.length === 0
        ? <h3 data-testid="text-for-no-conversation">
          Nenhuma conversa por aqui
          </h3>
        : <div>
          {users && users.map((element, index) => (
            <div data-testid="containerChat" key={ index }>
              <Link className="link" to={ `/admin/chats/${element._id}` }>
                <p data-testid="profile-name">{element._id}</p>
              </Link>
              <p data-testid="last-message">{element.lastMessage}</p>
            </div>
          ))}
          </div>}
    </div>
  );
}
