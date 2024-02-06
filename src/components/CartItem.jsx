const CartItem = ({ item, ToIncrement, ToDecrement, ToRemove }) => {
  const handleIncrement = () => ToIncrement(item.id);
  const handleDecrement = () => ToDecrement(item.id);
  const handleRemove = () => ToRemove(item.id);

  const itemTotalPrice = (item.unitPrice * item.qty).toFixed(2);

  return (
    <li className='cart-item'>
      <p className='item-name'>{item.qty}&times; {item.name}</p>
      <div className="controller_panel">
        <p className='item-price'>${itemTotalPrice}</p>
        <div className='cart-controller'>
          <button onClick={handleIncrement} className='cart-btn controller_btns'>+</button>
          <p>{item.qty}</p>
          <button onClick={handleDecrement} className='cart-btn controller_btns'>-</button>
        </div>
        <button onClick={handleRemove} className='cart-btn delete_btn'>DELETE</button>
      </div>
    </li>
  );
};

export default CartItem;