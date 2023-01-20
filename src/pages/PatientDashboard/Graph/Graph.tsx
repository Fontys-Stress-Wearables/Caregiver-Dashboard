import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import 'chartjs-adapter-moment'
import FeedbackModal from '../../../components/Modals/FeedbackModal/FeedbackModal'
import {
  FeedbackProps,
  getFeedbackById,
  getStressDataByPatientIdAndTimespan,
  useAuthRequest,
} from '../../../utils/api/calls'
import { useParams } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { getGraphData, graphOptions } from './GraphOptions'
import { getElementAtEvent, Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js'
import styles from './Graph.module.scss'

// ChartJS imports must be registered here
ChartJS.register(CategoryScale, LinearScale, TimeScale)
ChartJS.register(PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

const emptyFeedback = {
  id: '',
  patientId: '',
  authorId: '',
  stressMeasurementId: '',
  comment: '',
  createdCommentDate: '',
  createdStressMeasurementDate: '',
}

type Props = {
  dateForm: { startDate: string; endDate: string }
  updateFeedback: () => void
}
const Graph = ({ dateForm, updateFeedback }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false)
  const [graphData, setGraphData] = useState(getGraphData([]))
  // const [graphData, setGraphData] = useState(getGraphData(MockHr())) // Mock HR Data

  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedbackForm, setFeedbackForm] = useState<FeedbackProps>(emptyFeedback)

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

  const fetchFeedback = (feedbackId: string) => {
    if (feedbackId == undefined) return undefined

    instance.acquireTokenSilent(request).then((res) => {
      getFeedbackById(res.accessToken, feedbackId).then((response) => {
        if (response.error) {
          setError(true)
          return undefined
        } else {
          setError(false)
          return response.response
        }
      })
    })
  }

  const onGraphClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (chartRef == undefined || chartRef.current == undefined) return

    if (getElementAtEvent(chartRef.current, event)[0]) {
      const dataPointIndex = getElementAtEvent(chartRef.current, event)[0].index
      const dataPointData = graphData.datasets[0].data[dataPointIndex]
      if (dataPointData.comment == undefined || dataPointData.comment === '') {
        const initialComment = {
          id: '',
          patientId: dataPointData.patientId,
          authorId: '00000000-0000-0000-0000-000000000000',
          stressMeasurementId: dataPointData.id,
          comment: '',
          createdCommentDate: JSON.stringify(new Date()),
          createdStressMeasurementDate: dataPointData.timeStamp,
        }
        setFeedbackForm(initialComment)
        setShowFeedbackModal(true)
      } else {
        if (dataPointData.commentId == undefined) return
        const fetchedFeedback = fetchFeedback(dataPointData.commentId)
        if (fetchedFeedback != undefined) {
          setFeedbackForm(fetchedFeedback)
          setShowFeedbackModal(true)
        }
      }
    }
  }

  return (
    <div className={styles.Container}>
      <h3>Heart rate</h3>
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

      <FeedbackModal
        feedbackForm={feedbackForm}
        setFeedbackForm={setFeedbackForm}
        updateFeedback={updateFeedback}
        show={showFeedbackModal}
        hide={() => setShowFeedbackModal(false)}
      />
    </div>
  )
}

export default Graph
