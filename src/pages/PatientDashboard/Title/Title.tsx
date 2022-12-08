import React, { useEffect, useState } from 'react'
import { getPatient, PatientProps, useAuthRequest } from '../../../utils/api/calls'
import { useMsal } from '@azure/msal-react'
import { useParams } from 'react-router-dom'
import './Title.module.scss'

const TitlePatient = () => {
  const { instance } = useMsal()
  const { id } = useParams()
  const request = useAuthRequest()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false)
  const [patient, setPatient] = useState<PatientProps>()

  useEffect(() => {
    const fetchPatientInfo = () => {
      instance.acquireTokenSilent(request).then((res) => {
        if (!id) return

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
    if (id) {
      fetchPatientInfo()
    }
  }, [id])

  return (
    <div className='TitlePatient'>
      <h1>
        {patient?.firstName} {patient?.lastName}
      </h1>
    </div>
  )
}

export default TitlePatient
