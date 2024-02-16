import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/LoginPage/Login';
import Menu from './pages/MenuPage/Menu';
import Cart from './pages/Cart/Cart';
import './App.css';
import OrderForm from './pages/OrderPage/OrderForm';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/new" element={<OrderForm/>} />
      </Routes>
    </div>
  );
}

export default App;