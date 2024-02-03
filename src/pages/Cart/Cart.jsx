import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQty, incrementQty, removeFromCart, resetCart } from '../../redux/slices/CartSlice';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const [emptyCart, setEmptyCart] = useState(items.length === 0);
  const navigate = useNavigate();

  useEffect(() => {
    setEmptyCart(items.length === 0);
  }, [items]);

  const handleGoback = () => navigate('/menu');
  const handleIncrementCartQty = id => dispatch(incrementQty(id));
  const handleDecrementCartQty = id => dispatch(decrementQty(id));
  const handleRemoveFromCart = id => dispatch(removeFromCart(id));
  const handleResetCart = () => {
    dispatch(resetCart());
    setEmptyCart(true);
  };
  const totalPrice = items.reduce((total, item) => total + item.unitPrice * item.qty, 0).toFixed(2);
  const handleMakeOrder = () => console.log("Ordering pizzas:", items);

  return (
    <div className='cart-wrapper'>
      <div className="cart">
        <button className='goBack' onClick={handleGoback}>&#x2190; Back to Menu</button>
        {user && <div className='cart-holder'><h3>Your cart, {user}</h3></div>}

        {emptyCart ? (
          <div className='splash-cart'>
            <FontAwesomeIcon icon={faPizzaSlice} className='pizza_icon' />
            <div className='splash-cart_empty'>
              <div className='splash-cart_text'>Empty for now</div>
            </div>
          </div>
        ) : (
          <>
            <ul className='cart-items'>
              {items.map(item => {
                const itemTotalPrice = (item.unitPrice * item.qty).toFixed(2);
                return (
                  <li key={item.id} className='cart-item'>
                    <p className='item-name'>{item.qty}&times; {item.name}</p>
                    <div className="controller_panel">
                      <p className='item-price'>${itemTotalPrice}</p>
                      <div className='cart-controller'>
                        <button onClick={() => handleIncrementCartQty(item.id)} className='cart-btn controller_btns'>+</button>
                        <p>{item.qty}</p>
                        <button onClick={() => handleDecrementCartQty(item.id)} className='cart-btn controller_btns'>-</button>
                      </div>
                      <button onClick={() => handleRemoveFromCart(item.id)} className='cart-btn delete_btn'>DELETE</button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="order-pannel">
              <div>
                <button className='cart-btn order_btn' onClick={handleMakeOrder}>ORDER PIZZAS</button>
                <button className='cart-btn order_btn clear_btn' onClick={handleResetCart}>CLEAR CART</button>
              </div>
              <div className="cart-total">
                Total: ${totalPrice}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;