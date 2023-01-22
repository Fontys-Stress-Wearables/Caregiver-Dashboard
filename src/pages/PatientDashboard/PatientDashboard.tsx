import React, { useEffect, useState } from 'react'
import Graph from './Graph/Graph'
import BaseLayout from '../../layouts/BaseLayout'
import Title from './Title/Title'
import FeedbackList from './FeedbackList/FeedbackList'
import DatePicker from './DatePicker/DatePicker'
import {
  FeedbackProps,
  getFeedbackByPatientIdAndTimespan,
  useAuthRequest,
} from '../../utils/api/calls'
import { useParams } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'

const PatientDashboard = () => {
  const { id } = useParams()
  const { instance } = useMsal()
  const request = useAuthRequest()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<boolean>(false)
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  const [dateForm, setDateForm] = useState({
    startDate: yesterday.toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  })
  const [feedback, setFeedback] = React.useState<FeedbackProps[]>([])

  useEffect(() => {
    getPatientFeedbackByTimespan()
  }, [id, dateForm])

  const getPatientFeedbackByTimespan = () => {
    if (id == undefined) return

    instance.acquireTokenSilent(request).then((res) => {
      getFeedbackByPatientIdAndTimespan(
        res.accessToken,
        id,
        dateForm.startDate + 'T00:00:00.00',
        dateForm.endDate + 'T23:59:59.99',
      ).then((response) => {
        if (response.error) {
          setError(true)
        } else {
          setError(false)
          const fetchedPatientFeedback = response.response

          const sortedFeedback = fetchedPatientFeedback.sort(function (a, b) {
            return (
              new Date(a.createdStressMeasurementDate).getTime() -
              new Date(b.createdStressMeasurementDate).getTime()
            )
          })

          setFeedback(sortedFeedback)
        }
      })
    })
  }

  return (
    <BaseLayout>
      <Title />
      <DatePicker dateForm={dateForm} setDateForm={setDateForm} />
      <Graph dateForm={dateForm} updateFeedback={getPatientFeedbackByTimespan} />
      <FeedbackList feedback={feedback} updateFeedback={getPatientFeedbackByTimespan} />
    </BaseLayout>
  )
}

export default PatientDashboard
