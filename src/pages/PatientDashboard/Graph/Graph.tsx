import * as React from 'react'
import 'chartjs-adapter-moment'
import Form from 'react-bootstrap/esm/Form'
import CommentModal from '../../../components/Modals/CommentModal/CommentModal'
import {
  FeedbackProps,
  getStressDataByPatientIdAndTimespan,
  useAuthRequest,
} from '../../../utils/api/calls'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { graphOptions, getGraphData } from './GraphOptions'
import { Line, getElementAtEvent } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js'
import { PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js'

import styles from './Graph.module.css'
// ChartJS imports must be registered here
ChartJS.register(CategoryScale, LinearScale, TimeScale)
ChartJS.register(PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

const emptyComment = {
  id: '',
  patientId: '',
  authorId: '',
  stressMeasurementId: '',
  comment: '',
  createdCommentDate: '',
  createdStressMeasurementDate: '',
}

const Graph = () => {
  const [error, setError] = useState(false)
  const [graphData, setGraphData] = useState(getGraphData([]))
  // const [graphData, setGraphData] = useState(getGraphData(MockHr())) // Mock HR Data

  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [commentForm, setCommentForm] = useState<FeedbackProps>(emptyComment)

  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  const [dateForm, setDateForm] = useState({
    startDate: yesterday.toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  })

  const { id } = useParams()
  const { instance } = useMsal()
  const request = useAuthRequest()
  const chartRef = useRef() // UseRef tracks clicks on Graph

  useEffect(() => {
    getStressData()
  }, [dateForm, id])

  const getStressData = () => {
    if (id == undefined) return

    instance.acquireTokenSilent(request).then((res) => {
      getStressDataByPatientIdAndTimespan(
        res.accessToken,
        id,
        dateForm.startDate + 'T00:00:00.00',
        dateForm.endDate + 'T23:59:59.99',
      ).then((response) => {
        if (response.error) {
          setError(true)
        } else {
          setError(false)
          const fetchedStressData = response.response
          const newGraphData = getGraphData(fetchedStressData)
          setGraphData(newGraphData)
        }
      })
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDateForm({ ...dateForm, [event.target.name]: event.target.value })
  }

  const updateFeedback = () => {
    // ToDo Method of updating feedback after clicking it through graph
  }

  const onGraphClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (chartRef == undefined || chartRef.current == undefined) return

    if (getElementAtEvent(chartRef.current, event)[0]) {
      const dataPointIndex = getElementAtEvent(chartRef.current, event)[0].index
      const dataPointData = graphData.datasets[0].data[dataPointIndex]

      if (dataPointData.comment === '') {
        setCommentForm(emptyComment)
        setShowFeedbackModal(true) // Here we change state
      } else {
        setCommentForm(dataPointData)
        setShowFeedbackModal(true) // Here we change state
      }
    }
  }

  return (
    <div className={styles.Container}>
      <h3>Heart rate</h3>
      <div className={styles.DateForm}>
        <Form>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type='date'
              name='startDate'
              placeholder='Start Date'
              defaultValue={dateForm.startDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type='date'
              name='endDate'
              placeholder='End Date'
              defaultValue={dateForm.endDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </div>
      <div className={styles.Wrapper}>
        <div className={styles.Graph}>
          <Line
            ref={chartRef}
            options={graphOptions() as any}
            data={graphData}
            onClick={onGraphClick}
          />
        </div>
      </div>

      <CommentModal
        commentForm={commentForm}
        setCommentForm={setCommentForm}
        updateFeedback={updateFeedback}
        show={showFeedbackModal}
        hide={() => setShowFeedbackModal(false)}
      />
    </div>
  )
}

export default Graph
