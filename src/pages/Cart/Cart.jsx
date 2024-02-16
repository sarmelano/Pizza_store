import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQty, incrementQty, removeFromCart, resetCart } from '../../redux/slices/CartSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmModal from '../../components/DeleteConfirmModal';
import CartItem from '../../components/CartItem';
import './Cart.scss';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state)=> state.user.name);
  const { items, totalPrice } = useSelector(state => state.cart);
  const emptyCart = items.length === 0;

  const [modalOpen, setModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleGoback = useCallback(() => navigate('/menu'), [navigate]);

  const handleIncrementCartQty = useCallback((id) => {dispatch(incrementQty(id));}, [dispatch]);
  const handleDecrementCartQty = useCallback((id) => {dispatch(decrementQty(id));}, [dispatch]);
  const handleRemoveFromCart = useCallback((id) => {setItemToDelete(id); setModalOpen(true);}, []);

  const handleDelete = useCallback(() => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete));
      setModalOpen(false);
    }
  }, [dispatch, itemToDelete]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleMakeOrder = useCallback(() => navigate('/order/new'), [navigate]);
  const handleResetCart = useCallback(() => dispatch(resetCart()), [dispatch]);

  return (
    <div className='cart-wrapper'>
      <DeleteConfirmModal
        isOpen={modalOpen}
        onConfirm={handleDelete}
        onCancel={closeModal}
      />

      <div className="cart">
        <button className='goBack' onClick={handleGoback}>&#x2190; Back to Menu</button>
        {userName && <div className='cart-holder'><h3>Your cart, {userName}</h3></div>}

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
                  ToIncrement={handleIncrementCartQty} 
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