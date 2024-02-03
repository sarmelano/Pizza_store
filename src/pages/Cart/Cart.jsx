import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQty, incrementQty, removeFromCart, resetCart } from '../../redux/slices/CartSlice';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { user } = useContext(UserContext)
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);

  const [emptyCart, setEmptyCart] = useState(false);

  const navigate = useNavigate();
  const handleGoback = () => {
    navigate('/menu')
  }

  const handleIncrementCartQty = (id) => {
    dispatch(incrementQty(id))
  };

  const handleDecrementCartQty = (id) => {
    dispatch(decrementQty(id))
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id))
  };

  const handleResetCart = () => {
    dispatch(resetCart())
    setEmptyCart(true)
  };

  const handleMakeOrder = () => {
    console.log("Ordering pizzas:", items);
  }

//if cart empty
  useEffect(() => {
    if (items.length === 0) {
      setEmptyCart(true);
    } else {
      setEmptyCart(false);
    }
  }, [items]);

  return (
    <div className='cart-wrapper'>
      <div className="cart">

        <button className='goBack' onClick={handleGoback}>&#x2190; Back to Menu</button>

        <div className='cart-holder'>{user && <h3>Your cart, {user}</h3>}</div>

        {emptyCart ? (<div className='splash-cart'><FontAwesomeIcon icon={faPizzaSlice} className='pizza_icon'/><div className='splash-cart_empty'><div className='splash-cart_text'>Empty for now</div></div></div>) 
        :
          (<ul className='cart-items'>
            {items.map(item =>
              <li key={item.id} className='cart-item'>
                <p className='item-name'>{item.qty}&times; {item.name} </p>
                <div className="controller_panel">

                  <div className='cart-controller'>
                    <button onClick={() => handleIncrementCartQty(item.id)} className='cart-btn controller_btns'>+</button>
                    <p>{item.qty}</p>
                    <button onClick={() => handleDecrementCartQty(item.id)} className='cart-btn controller_btns'>-</button>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item.id)} className='cart-btn delete_btn'>DELETE</button>

                </div>
              </li>
            )}

            <div className="cart-order_btns">
              <button className='cart-btn order_btn' onClick={handleMakeOrder}>ORDER PIZZAS</button>
              <button className='cart-btn order_btn clear_btn' onClick={handleResetCart}>CLEAR CART</button>
            </div>
          </ul>)
        }
      </div>
    </div>
  )
}

export default Cart
/* anonym func cause of send props */