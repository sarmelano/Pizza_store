import React from 'react'
import Login from './Login'

export default function Main() {
  return (
    <main className="App-main">
      <div className='flash'>
        <p>The best Pizza.</p>
        <p className='flash-orange'>Straight out of the oven, straight to you!</p>
      </div>
      <Login />
    </main>
  )
};