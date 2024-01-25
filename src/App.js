import React, { useState, useContext } from 'react';
import './App.css';

// Создаем контекст
const UserContext = React.createContext();

const Login = () => {
  const [name, setName] = useState('');
  const { setUser } = useContext(UserContext);

  return (
    <div className='desc'>
      <p>Welcome! Please start by telling us your name:</p>
      <p>
        <input 
          type="text" 
          id="user-name" 
          placeholder="Your full name" 
          onChange={(e) => setName(e.target.value)} 
        />
        {name && <button onClick={() => setUser(name)}>Войти</button>}
      </p>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <header className="App-header">
          <p>PIZZA DAY</p>
          <p><input type="text" id="query" placeholder="Search..."/></p>
        </header>
        <main className="App-main">
          <div className='flash'>
            <p>The best Pizza.</p>
            <p className='flash-orange'>Straight out of the oven, straight to you!</p>
          </div>
          <Login />
        </main>
      </div>
      {user && console.log(user)}
    </UserContext.Provider>
  );
}

export default App;
