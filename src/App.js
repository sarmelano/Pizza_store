import React, { useState } from 'react';
import './App.css';
import UserContext from './context/UserContext';
import Header from './components/Header';
import Main from './pages/LoginPage/Main';
import Menu from './pages/MenuPage/Menu';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
