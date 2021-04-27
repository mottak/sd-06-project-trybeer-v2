import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MenuSideBarAdm from '../components/menuAdmin/MenuSideBarAdm';

import api from '../services/api';
// import { valueTotal } from '../utils/checkoutUtils';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    async function fetchOrders() {
      const user = JSON.parse(localStorage.user);
      api.getAllOrders(user.token).then((response) => {
        setOrders(response);
        if (response.message) return history.push('/login');
        setIsLoading(true);
      });
    }
    fetchOrders();
  }, [history]);

  // const handleClick = (id) => {
  //   history.push(`/admin/orders/${id}`);
  // };

  return (
    isLoading
      ? (
        <div>
          <MenuSideBarAdm />
          {orders.map((order, index) => (
            <div
              className="movie-card"
              key={ index }
            >
              <Link
                data-testid={ `${index}-card-order` }
                to={ `/admin/orders/${order.id}` }
              >
                <p data-testid={ `${index}-order-number` }>
                  {`Pedido ${order.id}`}
                </p>
                <p data-testid={ `${index}-order-address` }>
                  {`${order.deliveryAddress}, ${order.deliveryNumber}`}
                </p>
                <p data-testid={ `${index}-order-total-value` }>
                  {`R$ ${order.totalPrice.replace('.', ',')}`}
                </p>
                <p data-testid={ `${index}-order-status` }>
                  {order.status}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : true
  );
};

export default AdminOrders;
