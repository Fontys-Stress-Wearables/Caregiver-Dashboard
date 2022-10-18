import React from 'react'
import './header.css'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'
import SWSPLogo from '../../assets/swsp-logo.svg'

function Header() {
  const navigate = useNavigate()
  return (
    <div className="Header">
      <div className="Logo" role="presentation" onClick={() => navigate('/')}>
        <img src={SWSPLogo} alt="SWSP Logo" />
      </div>
      <div className="Logout">
        <Button
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
  )
}

export default Header
