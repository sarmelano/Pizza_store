import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName as setUserName } from '../../redux/slices/UserSlice';
import { useNavigate } from 'react-router-dom';


export default function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  

  const handleLogin = () => {
    dispatch(setUserName(name));
    /*     setName('');*/
    navigate(`/menu`)  //navigate deeper in server
  };

  return (
    <main className="App-main">
      <div className='flash'>
        <p>The best Pizza.</p>
        <p className='flash-orange'>Straight out of the oven, straight to you!</p>
      </div>
      <div className='desc'>
        <p>Welcome! Please start by telling us your name:</p>
        <div>
          <input type="text" id="user-name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />

          {name && <p><button onClick={handleLogin} className='userName__btn'>Next</button></p>}
        </div>
      </div>
    </main>
  )
};