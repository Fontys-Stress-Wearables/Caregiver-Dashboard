import React, { useEffect, useState } from 'react'
import './titlePatient.css'
import { useMsal } from '@azure/msal-react'
import { useParams } from 'react-router-dom'
import { getPatient, useAuthRequest } from '../../utils/api/calls'

function TitlePatient() {
  const { instance } = useMsal()
  const { id } = useParams()
  const request = useAuthRequest()

  const [patient, setPatient] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    if (id) {
      fetchPatientInfo()
    }
  }, [])

  const fetchPatientInfo = () => {
    instance.acquireTokenSilent(request).then((res) => {
      getPatient(res.accessToken, id).then((response) => {
        if (response.error) {
          setError(true)
        } else {
          const fetchedPatient = response.response
          setError(false)
          setPatient(fetchedPatient)
        }
      })
    })
  }

  return (
    <div className="TitlePatient">
      <h1>
        {patient?.firstName} {patient?.lastName}
      </h1>
    </div>
  )
}

export default TitlePatient
