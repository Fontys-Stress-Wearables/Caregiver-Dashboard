import * as React from 'react'
import moment from 'moment'
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
import CreateFeedbackModal from '../modals/createStressCommentModal/createStressCommentModal'
import EditFeedbackModal from '../modals/editStressCommentModal/editStressCommentModal'
import graphOptions from './graphOptions'

import mockData from './mockData.json'
import EditPatientModal from '../modals/editPatientModal/editPatientModal'
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

// datasets for graph
export const data = {
  datasets: [
    {
      data: mockData,
      borderColor: graphColour,
      backgroundColor: setBackgroundColor,
      pointRadius: 6,
    },
  ],
}

function Graph() {
  const [feedback, setFeedback] = useState({ comment: '' })
  const [showCreateFeedbackModal, setShowCreateFeedbackModal] = useState(false) // create comment
  const [showEditFeedbackModal, setShowEditFeedbackModal] = useState(false)

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
    <div className="GraphContainer">
      <h3>Heart rate variability</h3>
      <div className="GraphWrapper">
        <div className="Graph">
          <Line
            ref={chartRef}
            options={graphOptions()}
            data={data}
            onClick={onClick}
          />
        </div>
      </div>

      <EditFeedbackModal
        comment={feedback.comment}
        show={showEditFeedbackModal}
        closeModal={() => setShowEditFeedbackModal(false)}
      />
    </div>
  )
}

export default Graph
