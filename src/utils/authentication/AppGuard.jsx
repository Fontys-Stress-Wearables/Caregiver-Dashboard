import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'
import App from '../../root/App/App'
import { appRoles } from './authConfig'
import Unauthorised from '../../root/Unauthorised/Unauthorised'

export const AppGuard = () => {
  const { instance } = useMsal()
  const [isAuthorized, setIsAuthorized] = useState(false)

  const handleLogout = () => {
    instance.logoutRedirect().catch()
  }

  useEffect(() => {
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

    onLoad()
  }, [instance])

  if (isAuthorized) return <App />
  return <Unauthorised logout={handleLogout} />
}
