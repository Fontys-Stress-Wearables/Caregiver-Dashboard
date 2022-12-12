import * as React from 'react'
import 'chartjs-adapter-moment'
import CommentModal from '../Modals/CommentModal/CommentModal'
import { MockHr } from './MockData/HrData'
import { graphOptions, getGraphData } from './GraphOptions'
import { useRef, useState } from 'react'
import { Line, getElementAtEvent } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale } from 'chart.js'
import { PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js'
import mockData from './MockData/mockData.json'
import styles from './Graph.module.css'
import { FeedbackProps } from '../../utils/api/calls'

// ChartJS imports must be registered here
ChartJS.register(CategoryScale, LinearScale, TimeScale)
ChartJS.register(PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

function Graph() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const comment = { id: '', comment: '', date: '' }
  const [commentForm, setCommentForm] = useState<FeedbackProps>(comment)

  // UseRef tracks clicks on Graph
  const chartRef = useRef()
  const data = getGraphData(MockHr)

  const onGraphClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    console.log('click')
    if (chartRef == undefined || chartRef.current == undefined) return

    if (getElementAtEvent(chartRef.current, event)[0]) {
      const dataPointIndex = getElementAtEvent(chartRef.current, event)[0].index
      const dataPointData = data.datasets[0].data[dataPointIndex]

      if (dataPointData.comment === '') {
        setCommentForm(comment)
        setShowFeedbackModal(true) // Here we change state
      } else {
        setCommentForm(dataPointData)
        setShowFeedbackModal(true) // Here we change state
      }
    }
  }

  return (
    <div className={styles.Container}>
      <h3>Heart rate variability</h3>
      <div className={styles.Wrapper}>
        <div className={styles.Graph}>
          <Line ref={chartRef} options={graphOptions() as any} data={data} onClick={onGraphClick} />
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
