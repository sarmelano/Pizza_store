import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

export default function Header() {
  const { user } = useContext(UserContext)

  return (
    <header className="App-header">
      <p>PIZZA DAY</p>
      <p><input type="text" id="query" placeholder="Search..." /></p>
      {user && <p>{ user }</p>}
    </header>
  )
};