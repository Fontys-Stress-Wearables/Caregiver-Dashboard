import { useMsal } from '@azure/msal-react'
import { useEffect, useState } from 'react'
import App from '../../root/App/App'

export const AppGuard = (props) => {
  const { instance } = useMsal()
  const [isAuthorized, setIsAuthorized] = useState(false)

  const handleLogout = () => {
    instance.logoutRedirect().catch(console.error)
  }

  useEffect(() => {
    onLoad()
  }, [instance])

  const onLoad = async () => {
    const accounts = instance.getAllAccounts()

    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
    }

    const currentAccount = instance.getActiveAccount()

    if (currentAccount && currentAccount.idTokenClaims.roles) {
      const intersection = props.roles.filter((role) =>
        currentAccount.idTokenClaims.roles.includes(role),
      )

      if (intersection.length > 0) {
        setIsAuthorized(true)
      }
    }
  }

  if (isAuthorized) return <App />
  return (
    <div>
      <p>
        You are not authorized to view this page. Please contact your
        administrator.
      </p>
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}
