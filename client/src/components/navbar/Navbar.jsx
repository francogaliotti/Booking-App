import React from 'react'
import "./Navbar.css"
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to='/' style={{color:"#fff", textDecoration:"none"}}>
          <span className='logo'>Bookeando</span>
        </Link>
        <div className='navItems'>
          <button className='navButton'>Register</button>
          <button className='navButton'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar