import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';

export const Login = () => {
  const [name, setName] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    setUser(name);
    setName(''); 
  };

  return (
    <div className='desc'>
      <p>Welcome! Please start by telling us your name:</p>
      <div>
        <input type="text" id="user-name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)}/>

        {name && <p><button onClick={handleLogin} className='userName__btn'>Next</button></p>}
        
      </div>
    </div>
  );
};

export default Login;