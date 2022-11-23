import React from 'react'
import './titleWelcome.css'
import { useMsal } from '@azure/msal-react'

function TitleWelcome() {
  const { instance } = useMsal()

  return (
    <div className="WelcomeTitle">
      <h1>Caregiver Dashboard</h1>
      <h4>Welcome {instance?.getActiveAccount()?.name}</h4>
    </div>
  )
}

export default TitleWelcome
