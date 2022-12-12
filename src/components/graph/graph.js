import * as React from 'react'
import 'chartjs-adapter-moment'
import CommentModal from '../Modals/CommentModal/CommentModal'
import { mockHr } from './mockData/hrData'
import { graphOptions, getGraphData } from './GraphOptions'
import { useRef, useState } from 'react'
import { Line, getElementAtEvent } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js'
import { PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js'
import styles from './Graph.module.css'

// ChartJS imports must be registered here
ChartJS.register(CategoryScale, LinearScale, TimeScale)
ChartJS.register(PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

function Graph() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [commentForm, setCommentForm] = useState({})

  // UseRef tracks clicks on graph
  const chartRef = useRef()
  const data = getGraphData(mockHr())

  const onClick = (event) => {
    event.preventDefault()

    console.log('here')
    if (getElementAtEvent(chartRef.current, event)[0]) {
      const dataPointIndex = getElementAtEvent(chartRef.current, event)[0].index
      const dataPointData = data.datasets[0].data[dataPointIndex]

      if (dataPointData.comment === '') {
        setShowFeedbackModal(true) // Here we change state
      } else {
        setShowFeedbackModal(true) // Here we change state
      }
    }
  }

  return (
    <div className={styles.Container}>
      <h3>Heart rate variability</h3>
      <div className={styles.Wrapper}>
        <div className={styles.Graph}>
          <Line ref={chartRef} options={graphOptions()} data={data} onClick={onClick} />
        </div>
      </div>

      <CommentModal
        commentForm={commentForm}
        setCommentForm={setCommentForm}
        show={showFeedbackModal}
        hide={() => setShowFeedbackModal(false)}
      />
    </div>
  )
}

export default Graph
