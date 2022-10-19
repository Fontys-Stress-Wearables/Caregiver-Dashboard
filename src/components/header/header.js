import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'
import SWSPLogo from '../../assets/swsp-logo.svg'

function Header() {
  return (
    <div className="Header-Container">
      <div className="Header">
        <Link to="/" className="Logo">
          <img src={SWSPLogo} alt="SWSP Logo" className="Logo-Image" />
        </Link>
        <div className="Logout">
          <Button
            size="large"
            color="error"
            variant="contained"
            startIcon={<LogoutIcon />}
            onClick={() => {
              alert('clicked on LogOut')
            }}
          >
            Logout
          </Button>
        </div>
      </div>
      <hr className="Header-Separator" />
    </div>
  )
}

export default Header
