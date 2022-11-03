import React from 'react'
import './titleGraphPatient.css'
import { useMsal } from '@azure/msal-react'
import {
  BrowserRouter as Router,
  useLocation,
  useParams,
} from 'react-router-dom'

function TitleGraphPatient() {
  //authentication
  const { instance } = useMsal()

  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams()

  return (
    <div className="Title">
      <h1>Caregiver Dashboard</h1>
      <h4>{id}'s Stress Data</h4>
    </div>
  )
}

export default TitleGraphPatient
