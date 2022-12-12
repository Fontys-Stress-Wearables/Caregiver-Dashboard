import React, { useEffect, useState } from 'react'
import './titlePatient.css'
import { useMsal } from '@azure/msal-react'
import { useParams } from 'react-router-dom'
import { getPatient, getPatientFeedbackById, useAuthRequest } from '../../utils/api/calls'

function TitlePatient() {
  const { instance } = useMsal()
  const { id } = useParams()
  const request = useAuthRequest()

  const [patient, setPatient] = useState()
  const [feedback, setFeedback] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    
    if (id) {
      fetchPatientInfo()
      getPatientFeedback()
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

  const getPatientFeedback = () => {
    console.log("getPatientFeedback")
    instance.acquireTokenSilent(request).then((res) => {
      getPatientFeedbackById(res.accessToken, id).then((response) => {
        if (response.error) {
          console.log(response)
          setError(true)
        } else {
          console.log("no error")
          console.log(response)
          const fetchedPatientFeedback = response.response
          console.log(fetchedPatientFeedback)
          setError(false)
          setFeedback(fetchedPatientFeedback)
        }
      })
    })
    // getPatientFeedbackById(id).then((response) => {
    //     if (response.error) {
    //       console.log(response)
    //       setError(true)
    //     } else {
    //       console.log("no error")
    //       console.log(response)
    //       const fetchedPatientFeedback = response.response
    //       console.log(fetchedPatientFeedback)
    //       setError(false)
    //       setFeedback(fetchedPatientFeedback)
    //     }
    //   })
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
