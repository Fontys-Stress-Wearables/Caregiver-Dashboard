import * as React from 'react'
import 'chartjs-adapter-moment'
import './graph.css'
import { useRef, useState } from 'react'
import { Line, getElementAtEvent } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js'
import CommentModal from '../modals/CommentModal/CommentModal'
import graphOptions from './graphOptions'

import mockData from './mockData.json'
import aiMockData from './hr.json'

// when importing something from chart.js also add it here and vice versa
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
)

const commentDataPointColour = 'rgb(25,25,112, 0.8)'
const dataPointColour = 'rgb(30, 144, 255, 0.5)'
const graphColour = 'rgb(30, 144, 255)'
const setBackgroundColor = (ctx) => {
  if (ctx.raw && ctx.raw.comment) {
    return commentDataPointColour
  }
  return dataPointColour
}

// Convert aiMockdata to Array of Json
const mockValues = []
let latestDate = new Date(1970, 1, 1)
const sampleTimeMs = 3600000

Object.entries(aiMockData.value).forEach(([key, value]) => {
  const entryDate = new Date(parseInt(key, 10))
  if (entryDate - latestDate > sampleTimeMs) {
    mockValues.push({
      stressLevel: value,
      date: entryDate.toLocaleString('zh-Hans-CN').replace(',', ''),
      comment: '',
    })
    latestDate = entryDate
  }
})

// datasets for graph
export const data = {
  datasets: [
    {
      data: mockValues,
      borderColor: graphColour,
      backgroundColor: setBackgroundColor,
      pointRadius: 6,
    },
  ],
}

function Graph() {
  const [feedback, setFeedback] = useState({ comment: '' })
  const [showEditFeedbackModal, setShowEditFeedbackModal] = useState(false)
  const [commentForm, setCommentForm] = useState({})

  // onchart clicks to get datapoint data
  const chartRef = useRef()

  const onClick = (event) => {
    event.preventDefault()

    if (getElementAtEvent(chartRef.current, event)[0]) {
      const dataPointIndex = getElementAtEvent(chartRef.current, event)[0].index
      const dataPointData = data.datasets[0].data[dataPointIndex]

      if (dataPointData.comment === '') {
        setShowEditFeedbackModal(true) // Here we change state
      } else {
        setFeedback({ comment: dataPointData.comment })
        setShowEditFeedbackModal(true) // Here we change state
      }
    }
  }

  return (
    <div className='GraphContainer'>
      <h3>Heart rate variability</h3>
      <div className='GraphWrapper'>
        <div className='Graph'>
          <Line ref={chartRef} options={graphOptions()} data={data} onClick={onClick} />
        </div>
      </div>

      <CommentModal
        commentForm={commentForm}
        setCommentForm={setCommentForm}
        show={showEditFeedbackModal}
        closeModal={() => setShowEditFeedbackModal(false)}
      />
    </div>
  )
}

export default Graph
