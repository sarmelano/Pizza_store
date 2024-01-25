import React, { useState } from 'react';
import './App.css';
import UserContext from './context/UserContext';
import Header from './components/Header';
import Main from './components/LoginPage/Main';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className="App">
          <Header />
          <Main />
        </div>
        {user && console.log(user)} {/* вместо компонента */}
      </Router>
    </UserContext.Provider>
  );
}

export default App;