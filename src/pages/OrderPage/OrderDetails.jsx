import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderDetails = () => {
  const { state } = useLocation();

  if (!state || !state.orderData) {
    return <div>Loading...</div>;
  }

  const { orderData } = state;
  const priorityPrice = orderData.priority ? '8$' : '0$'; // Определяем приоритетную цену

  return (
    <div>
      <h2>Order Details</h2>
      <div>
        <p>Customer: {orderData.customer}</p>
        <p>Status: {orderData.status}</p>
        <p>Priority: {orderData.priority ? 'Yes' : 'No'}</p>
        <p>Estimated Delivery: {orderData.estimatedDelivery}</p>
        <p>Order Price: {orderData.orderPrice}$</p>
        <p>Priority Price: {priorityPrice}</p> {/* Отображаем приоритетную цену */}
      </div>
      <h3>Order Items</h3>
      <ul>
        {orderData.cart.map((item, index) => (
          <li key={index}>
            {item.name} - Quantity: {item.quantity}, Total Price: {item.totalPrice}$
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
