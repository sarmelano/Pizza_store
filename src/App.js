import React, { useState } from 'react';
import './App.css';
import UserContext from './context/UserContext';
import Header from './components/Header';
import Main from './components/LoginPage/Main';

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Header/>
        <Main/>
      </div>
      {user && console.log(user)} {/* вместо компонента */}
    </UserContext.Provider>
  );
}

export default App;