type Props = {
  logout: () => void
}

function Unauthorised({ logout }: Props) {
  return (
    <div>
      <p>You are not authorized to view this page. Please contact your administrator.</p>
      <button type='button' onClick={logout}>
        logout
      </button>
    </div>
  )
}

export default Unauthorised
