import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    setUser(name);
/*     setName('');
 */    navigate(`/menu`)
  };

  return (
    <div className='desc'>
      <p>Welcome! Please start by telling us your name:</p>
      <div>
        <input type="text" id="user-name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />

        {name && <p><button onClick={handleLogin} className='userName__btn'>Next</button></p>}

      </div>
    </div>
  );
};

export default Login;