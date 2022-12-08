import React from 'react'
import { useMsal } from '@azure/msal-react'
import styles from './title.module.scss'

function Title() {
  const { instance } = useMsal()

  return (
    <div className={styles.Title}>
      <h1>Caregiver Dashboard</h1>
      <h4>Welcome {instance?.getActiveAccount()?.name}</h4>
    </div>
  )
}

export default Title
