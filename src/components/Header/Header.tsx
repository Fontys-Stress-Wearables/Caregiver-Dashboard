import React from 'react'
import { useMsal } from '@azure/msal-react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import LogoutIcon from '@mui/icons-material/Logout'
import SWSPLogo from '../../assets/swsp-logo.svg'
import styles from './Header.module.scss'
import { IPublicClientApplication } from '@azure/msal-browser'

function Header() {
  const { instance } = useMsal()

  function handleLogout(instance: IPublicClientApplication) {
    instance.logoutRedirect().catch(console.error)
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <Link to='/' className={styles.Logo}>
          <img src={SWSPLogo} alt='SWSP Logo' className={styles.LogoImage} />
        </Link>
        <div className={styles.Logout}>
          <Button
            size='large'
            color='error'
            variant='contained'
            startIcon={<LogoutIcon />}
            onClick={() => handleLogout(instance)}
          >
            Logout
          </Button>
        </div>
      </div>
      <hr className={styles.Separator} />
    </div>
  )
}

export default Header
