import React from 'react'
import './titlePatient.css'
import { useMsal } from '@azure/msal-react'
import { useParams } from 'react-router-dom'

function TitlePatient() {
  // authentication
  const { instance } = useMsal()

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  const { id } = useParams()

  return (
    <div className="TitlePatient">
      <h1>Milan's Dashboard</h1>
    </div>
  )
}

export default TitlePatient
