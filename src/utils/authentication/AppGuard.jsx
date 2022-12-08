import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'
import App from '../../root/App/App'
import { appRoles } from './authConfig'
import { Unauthorised } from '../../components/unauthorised'

export const AppGuard = () => {
  const { instance } = useMsal()
  const [isAuthorized, setIsAuthorized] = useState(false)

  const handleLogout = () => {
    instance.logoutRedirect().catch()
  }

  useEffect(() => {
    onLoad()
  }, [instance])

  const onLoad = () => {
    const accounts = instance.getAllAccounts()

    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
    }

    const currentAccount = instance.getActiveAccount()

    if (currentAccount && currentAccount.idTokenClaims.roles) {
      const intersection = [appRoles.Admin, appRoles.Caregiver].filter((role) =>
        currentAccount.idTokenClaims.roles.includes(role),
      )

      if (intersection.length > 0) {
        setIsAuthorized(true)
      }
    }
  }

  if (isAuthorized) return <App />
  return <Unauthorised handleLogout={handleLogout} />
}
