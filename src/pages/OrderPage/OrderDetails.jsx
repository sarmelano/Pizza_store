import React from 'react';

const OrderDetails = ({ orderData }) => {
  return (
    <div>
      <h2>Order Details</h2>
      <div>
        <p>Customer: {orderData.customer}</p>
        <p>Status: {orderData.status}</p>
        <p>Priority: {orderData.priority ? 'Yes' : 'No'}</p>
        <p>Estimated Delivery: {orderData.estimatedDelivery}</p>
        <p>Order Price: {orderData.orderPrice}$</p>
        <p>Priority Price: {orderData.priorityPrice}$</p>
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
