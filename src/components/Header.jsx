import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function Header() {
  const navigate = useNavigate();
  const userName = useSelector((state)=> state.user.name);
  const cartItems = useSelector((state) => state.cart.items);

  const itemCount = cartItems.reduce((total, item) => total + item.qty, 0);

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  const handleNavigateToMain = () => {
    navigate('/')
  }

  return (
    <header className="App-header">
      <button className='header_logo' onClick={handleNavigateToMain}>PIZZA DAY</button>
      <p><input type="text" id="query" placeholder="Search..." /></p>

      <div className="header_userInfo">
        {userName && <p>{userName}</p>}
        <div className="cart-icon-container" onClick={handleNavigateToCart}>
          <FaShoppingCart className="cart-icon" size="24" color="gray" />
          {itemCount > 0 &&
            <span className="item-count">{itemCount}</span>}
        </div>
      </div>
    </header>
  );
};