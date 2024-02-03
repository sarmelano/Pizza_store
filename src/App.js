import React, { useState } from 'react';
import UserContext from './context/UserContext';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/LoginPage/Main';
import Menu from './pages/MenuPage/Menu';
import Cart from './pages/Cart/Cart';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const showNavigation = location.pathname !== "/";

  return (
    <UserContext.Provider value={{ user, setUser }}>

      <div className="App">
        {/* {showNavigation && (
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/cart">Cart</NavLink>
          </nav>
        )} */}

        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>

    </UserContext.Provider>
  );
}

export default App;
