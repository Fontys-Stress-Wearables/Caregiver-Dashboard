import * as React from 'react'
import 'chartjs-adapter-moment'
import moment from 'moment'
import { useRef, useState } from 'react'
import './graph.css'
import './mockData.json'
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
import { Line, getElementAtEvent } from 'react-chartjs-2'
import CreateStressCommentModal from '../modals/createStressCommentModal/createStressCommentModal'
import EditStressCommentModal from '../modals/editStressCommentModal/editStressCommentModal'

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

// mock json data - has to be ordered by date, chartjs does not order dates
const mockData = require('./mockData.json')

// graph colours
const commentDataPointColour = 'rgb(25,25,112, 0.8)'
const dataPointColour = 'rgb(30, 144, 255, 0.5)'
const graphColour = 'rgb(30, 144, 255)'

// custom footer of the tooltip popup for displaying comment
const footer = (tooltipItems) => {
  let comment = ''
  tooltipItems.forEach((tooltipItem) => {
    comment = tooltipItem.raw.comment
  })
  if (comment === '') {
    return 'Comment: -'
  }
  return `Comment: ${comment}`
}

// React Chartjs chart options setup
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // set to false otherwise user can click graph away
      position: 'top',
    },
    tooltip: {
      callbacks: {
        footer,
      },
    },
  },
  scales: {
    x: {
      type: 'time', // neccessary to make x axis time based
      time: {
        unit: 'day', // year, month, day, hour - should be updated based on the time filter a user chooses
      },
      displayFormats: {
        month: 'MMM YYYY',
      },
    },
  },
  parsing: {
    xAxisKey: 'date',
    yAxisKey: 'stressLevel',
  },
}

// function to higligh datapoints that have comments
const highlightCommentDatapoint = (ctx) => {
  if (ctx.raw) {
    if (ctx.raw.comment) {
      return commentDataPointColour
    }
  }
  return dataPointColour
}

const bgColor = (ctx) => highlightCommentDatapoint(ctx)

// datasets for graph
export const data = {
  datasets: [
    {
      data: mockData.data,
      borderColor: graphColour,
      backgroundColor: bgColor,
      pointRadius: 6,
    },
  ],
}

function Graph() {
  const [isPreviewShown, setPreviewShown] = useState(false) // edit comment
  const [isCreateCommentModalShown, setCreateCommentModalShown] =
    useState(false) // create comment
  const [state, setstate] = useState({ comment: '', date: '' })

  // onchart clicks to get datapoint data
  const chartRef = useRef()

  const onClick = (event) => {
    // check if a datapoint has been clicked
    if (getElementAtEvent(chartRef.current, event)[0]) {
      const dataPointIndex = getElementAtEvent(chartRef.current, event)[0].index
      const dataPointData = data.datasets[0].data[dataPointIndex]

      if (dataPointData.comment === '') {
        // create comment if no comment exist
        event.preventDefault()
        setstate({
          date: moment(new Date(dataPointData.date)).format('YYYY-MM-DD'),
        })
        setCreateCommentModalShown(!isCreateCommentModalShown) // Here we change state
      } else {
        // edit comment if comment exists
        event.preventDefault()
        setstate({ comment: dataPointData.comment })
        setPreviewShown(!isPreviewShown) // Here we change state
      }
    }
  }

  return (
    <div className="GraphWrapper">
      <h3>Heart rate variability</h3>
      <div className="GraphContainer">
        <div className="Graph">
          <Line
            ref={chartRef}
            options={options}
            data={data}
            onClick={onClick}
          />
        </div>
      </div>
      {isPreviewShown && (
        <div>
          <EditStressCommentModal
            comment={state.comment}
            setPreviewShown={setPreviewShown}
          />
        </div>
      )}
      {isCreateCommentModalShown && (
        <div>
          <CreateStressCommentModal
            date={state.date}
            setCreateCommentModalShown={setCreateCommentModalShown}
          />
        </div>
      )}
    </div>
  )
}

export default Graph
