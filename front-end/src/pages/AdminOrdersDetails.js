import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import SideBarAdmin from '../components/SideBarAdmin/SideBarAdmin';
import { getOrder, updateStatus } from '../services/orderDetailsService';

import './AdminOrdersDetails.css';

function AdminOrdersDetails(props) {
  const { match: { params: { id } } } = props;

  const [orders, setOrders] = useState([]);
  const [delivered, setDelivered] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    getOrder(id).then((result) => {
      setOrders(result[0]);

      setLoading(false);
    });
  }, [delivered]);

  return (
    loading
      ? <div>loading</div>
      : (
        <div className="div-main">
          { !loggedUser && <Redirect to="/login" />}
          <SideBarAdmin />
          <div className="div-filha">
            <div className="divDetails">
              <h2 data-testid="order-number">{`Pedido ${id} - `}</h2>
              <h3 data-testid="order-status" className={ orders.status }>
                {orders.status}
              </h3>
              {orders.products && orders.products.map((order, index) => (
                <div className="orderDetails" key={ index }>
                  <span data-testid={ `${index}-product-qtd` }>
                    {`${order.sales_products.quantity} `}
                  </span>
                  <span data-testid={ ` ${index}-product-name` }>{order.name}</span>
                  <br />
                  <span data-testid={ `${index}-product-total-value` }>
                    {`R$ ${(order.price).replace('.', ',')} ` }
                  </span>
                  <span data-testid={ `${index}-order-unit-price` }>
                    {` (R$ ${(order.price).toString().replace('.', ',')})`}
                  </span>
                </div>
              ))}
              <p className="totalPrice" data-testid="order-total-value">
                {orders.totalPrice
                  && `Total: R$ ${(orders.totalPrice).replace('.', ',')}`}
              </p>
              {orders.status === 'Pendente'
                && (
                  <button
                    className="buttonEntregar"
                    type="button"
                    data-testid="mark-as-prepared-btn"
                    onClick={ () => updateStatus(id, setDelivered, 'Preparando') }
                  >
                    Preparar pedido
                  </button>
                )}
              {orders.status !== 'Entregue'
                && (
                  <button
                    className="buttonEntregar"
                    type="button"
                    data-testid="mark-as-delivered-btn"
                    onClick={ () => updateStatus(id, setDelivered, 'Entregue') }
                  >
                    Marcar como entregue
                  </button>
                )}
            </div>
          </div>
        </div>
      )
  );
}

AdminOrdersDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default AdminOrdersDetails;
