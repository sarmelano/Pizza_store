import React from 'react'
import './menu.css'

export default function MenuItem({ item }) {
  const { name, unitPrice, imageUrl, ingredients, soldOut } = item
  return (
    <li>
      <div className='item_img-wrapper'> <img className='item__img' src={imageUrl} alt={name} /></div>
      <p>{name}</p>
      <p>{unitPrice} $</p>
      <button>Add to cart</button>
    </li>
  )
};