import React from 'react'
import './menu.css'

export default function MenuItem({ item }) {
  const { name, unitPrice, imageUrl, ingredients, soldOut } = item
  return (
    <li className='menu_item'>
      <div className='item_img-wrapper'>
        <img className='item__img' src={imageUrl} alt={name} />
        <p className='item__img-desc'>{ingredients.join('\n')}</p>


      </div>
      <div className='item_desc-wrapper'>
        <p>{name}</p>
        <p className='item_price'>{unitPrice} $</p>
        <button className='item_btn'>Add to cart</button>
      </div>
    </li>
  )
};