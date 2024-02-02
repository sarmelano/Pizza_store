import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQty, incrementQty, removeFromCart } from '../../redux/slices/CartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);

  const handleIncrementCartQty = (id) => {
    dispatch(incrementQty(id))
  };

  const handleDecrementCartQty = (id) => {
    dispatch(decrementQty(id))
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id))
  };


  return (
    <div>

      <ul>
        {items.map(item =>
          <li key={item.id}>
            <p>{item.name} {item.qty}</p>
            <div>
              <button onClick={() => handleIncrementCartQty(item.id)}>+</button>
              <p>{item.qty}</p>
              <button onClick={() => handleDecrementCartQty(item.id)}>-</button>
            </div>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove item</button>
          </li>
        )}
      </ul>

    </div>
  )
}

export default Cart

/* anonym func cause of send props */