import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/CartSlice';
import '../pages/MenuPage/Menu.scss'

export default function MenuItem({ item }) {
  const { name, unitPrice, imageUrl, ingredients, soldOut } = item;
  const dispatch = useDispatch();
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleAddToCart = () => {
    setButtonClicked(true); // Trigger
    dispatch(addToCart(item));

    // Remove 
    setTimeout(() => {
      setButtonClicked(false);
    }, 500); // duration 
  };

  return (
    <li className={`menu-item ${soldOut ? 'sold-out' : ''}`}>
      <div className='item-img__wrapper'>
        <img className='item-img' src={imageUrl} alt={name} />
        <p className='item-img__desc'>{soldOut ? 'Sold Out' : ingredients.join(', ')}</p>
      </div>
      <div className='item-desc__wrapper'>
        <p className={`item_name ${soldOut ? 'sold-out' : ''}`}>{name}</p>
        <p className={`item_price ${soldOut ? 'sold-out' : ''}`}>{unitPrice} $</p>
        <button
          className={`item_btn ${buttonClicked ? 'button-clicked' : ''}`}
          onClick={handleAddToCart}
          disabled={soldOut}
        >
          Add to cart
        </button>
      </div>
    </li>
  );
}
