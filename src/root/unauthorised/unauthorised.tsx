function Unauthorised({ handleLogout }: any) {
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

export default Unauthorised
