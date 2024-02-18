import React from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const OrderDetails = () => {
  const { state } = useLocation();
  const priorityCost = 8;

  if (!state || !state.orderData) {
    return <div>Loading...</div>;
  }

  const { orderData } = state;
  const priorityLabel = orderData.priority ? 'Priority' : '';

  const formattedEstimatedDelivery = moment(orderData.estimatedDelivery).format('MMM DD, h:mmA');

  const pizzaTotalPrice = orderData.cart.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);

  return (
    <div className='orderDetails_block'>
      <div className='orderDetails_heading'>
        <h3>Order for {orderData.customer}, status: {orderData.status}</h3>
        <div className='orderDetails_detail'>
          {priorityLabel && <p className='detail_prioritet'>{priorityLabel}</p>}
          <p className='detail_status'>{orderData.status} order</p>
        </div>
      </div>
      <div className='orderDetails_delivery'>
        <p>Only 9 minutes left &#x1F60A;</p>
        <p className='orderDetails_delivery_estimate'>(Estimated delivery: {formattedEstimatedDelivery})</p>
      </div>
      <ul className='items_list'>
        {orderData.cart.map((item, index) => (
          <li key={index} className='list_item'>
            <p className='orderDetails_order'>{item.quantity}&times; {item.name}</p> <p>${(item.unitPrice * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>

      <div className='orderDetails-prices_block'>
        <p>Price pizza:  ${pizzaTotalPrice.toFixed(2)}</p>
        <p className='prices_block__priority'>Price priority:  {orderData.priority ? `$${priorityCost.toFixed(2)}` : '$0.00'}</p>
        <p>To pay on delivery:  ${(orderData.priority ? (pizzaTotalPrice + priorityCost).toFixed(2) : pizzaTotalPrice.toFixed(2))}</p>
      </div>
    </div>
  );
};

export default OrderDetails;