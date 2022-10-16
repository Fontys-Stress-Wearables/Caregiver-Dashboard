import React from 'react'
import './header.css'
import SWSPLogo from '../../assets/swsp-logo.svg'

function Header() {
  return (
    <div className="Header">
      <h1 className="OrganizationTitle">SWSP</h1>
      <h5 className="Login">Login</h5>
      <img className="Logo" src={SWSPLogo} alt="SWSP Logo" />
    </div>
  )
}

export default Header
