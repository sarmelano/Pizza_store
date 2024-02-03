import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQty, incrementQty, removeFromCart, resetCart } from '../../redux/slices/CartSlice';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmaModal from './DeleteConfirmModal';
import './cart.scss';
import CartItem from './CartItem';

const Cart = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector(state => state.cart);
  const [emptyCart, setEmptyCart] = useState(items.length === 0);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleGoback = () => navigate('/menu');
  const totalPrice = items.reduce((total, item) => total + item.unitPrice * item.qty, 0).toFixed(2);

  useEffect(() => {
    setEmptyCart(items.length === 0);
  }, [items]);

  const handleIncrementCartQty = id => dispatch(incrementQty(id));
  const handleDecrementCartQty = id => dispatch(decrementQty(id));
  const handleRemoveFromCart = id => openModal(id);
  const openModal = (id) => {
    setItemToDelete(id);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete));
      setModalOpen(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleMakeOrder = () => console.log("Ordering pizzas:", items);

  const handleResetCart = () => {
    dispatch(resetCart());
    setEmptyCart(true);
  };

  return (
    <div className='cart-wrapper'>
      <DeleteConfirmaModal
        isOpen={modalOpen}
        onConfirm={handleDelete}
        onCancel={closeModal}
      />

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
              {items.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  ToIncrement={handleIncrementCartQty}//обозвать  ={передать}
                  ToDecrement={handleDecrementCartQty}
                  ToRemove={handleRemoveFromCart}
                />
              ))}
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