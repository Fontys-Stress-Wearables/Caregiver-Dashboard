import * as React from 'react'
import 'chartjs-adapter-moment';
import moment from 'moment';
import { useRef, useState } from 'react';
import './graph.css'
import LineGraph from '../../assets/line-graph.jpg'
import CreateStressCommentModal from '../createStressCommentModal/createStressCommentModal'
import EditStressCommentModal from '../editStressCommentModal/editStressCommentModal'

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
} from 'chart.js';
import { Line, getElementAtEvent, getDatasetAtEvent, getElementsAtEvent } from 'react-chartjs-2';

//when importing something from ChartJS also add it here and vice versa
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

//mock json data - has to be ordered by date, chartjs does not order dates
const mockData = [
  {
    "stressLevel": 10, 
    "date": '2021-11-01 00:00:00',
    "comment": "Was watching a movie"
  },
  {
    "stressLevel": 100, 
    "date": '2021-11-03 00:00:00',
    "comment": "Rode a bike"
  },
  {
    "stressLevel": 110, 
    "date": '2021-11-05 00:00:00',
    "comment": "Did yoga"
  },
  {
    "stressLevel": 80, 
    "date": '2021-11-05 06:00:00',
    "comment": ""
  },
  {
    "stressLevel": 50, 
    "date": '2021-11-10 00:00:00',
    "comment": "Almost got murdered"
  },
  {
    "stressLevel": 13, 
    "date": '2021-11-12 00:00:00',
    "comment": ""
  },
  {
    "stressLevel": 20, 
    "date": '2021-11-15 00:00:00',
    "comment": ""
  },
  {
    "stressLevel": 58, 
    "date": '2021-11-16 00:00:00',
    "comment": "Jumpscare from movie"
  },
  {
    "stressLevel": 103, 
    "date": '2021-11-21 00:00:00',
    "comment": ""
  },
  {
    "stressLevel": 45, 
    "date": '2021-11-30 00:00:00',
    "comment": ""
  },
  {
    "stressLevel": 8, 
    "date": '2021-12-10 00:00:00',
    "comment": ""
  }
]

// custom footer of the tooltip popup for displaying comment
const footer = (tooltipItems) => {
  let comment = ""
  tooltipItems.forEach(function(tooltipItem) {
    comment = tooltipItem.raw.comment
  });
  if (comment === "") {
    return 'Comment: -';
  }
  return 'Comment: ' + comment;
};

//React Chartjs chart options setup
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // set to false otherwise user can click graph away
      position: 'top',
    },
    tooltip: {
      callbacks: {
        footer: footer,
      }
    }
  },
  scales: {
    x: {
      type: 'time', // neccessary to make x axis time based
      time: {
        unit: 'day', // year, month, day, hour - should be updated based on the time filter a user chooses
      },
      displayFormats: {
        month: 'MMM YYYY'
      }
    }
  },
  parsing: {
    xAxisKey: 'date',
    yAxisKey: 'stressLevel'
  },
};

// function to higligh datapoints that have comments
const highlightDatapoint = (ctx, value) => {
  if (ctx.raw) {
    if (ctx.raw.comment) {
      return "rgb(25,25,112, 0.8)";
    }
  }
  return "rgb(30, 144, 255, 0.5)";
};

const bgColor = ctx => highlightDatapoint(ctx, "rgb(30, 144, 255, 0.5)");

// datasets for graph
export const data = {
  datasets: [
    {
      label: 'Stress Level',
      data: mockData,
      borderColor: 'rgb(30, 144, 255)',
      backgroundColor: bgColor,
      pointRadius: 6,
    },
  ],
};

function Graph() {
 
  const [isPreviewShown, setPreviewShown] = useState(false) //edit comment 
  const [isCreateCommentModalShown, setCreateCommentModalShown] = useState(false) //create comment 
  const [state, setstate] = useState({comment: "", date: ""})

  // onchart clicks to get datapoint data
  const chartRef = useRef();

  const onClick = (event) => {
    if (getElementAtEvent(chartRef.current, event)[0]) { //check if a datapoint has been clicked

      var dataPointIndex = getElementAtEvent(chartRef.current, event)[0].index;
      var dataPointData = data.datasets[0].data[dataPointIndex];
      
      if (dataPointData.comment === "") { //create comment if no comment exist
        event.preventDefault()
        setstate({date: moment(new Date(dataPointData.date)).format('YYYY-MM-DD')})
        setCreateCommentModalShown(!isCreateCommentModalShown) // Here we change state
      } else { //edit comment if comment exists
        event.preventDefault()
        setstate({comment: dataPointData.comment})
        setPreviewShown(!isPreviewShown) // Here we change state
      }
    }
  }

  return (
    <div>
      <h1>Graph</h1>
      <div className="GraphContainer">
        <Line ref={chartRef} options={options} data={data} onClick={onClick}/>
      </div>
      {isPreviewShown && (
        <div>
          <EditStressCommentModal comment={state.comment} setPreviewShown={setPreviewShown} />
        </div>
      )}
      {isCreateCommentModalShown && (
          <div>
            <CreateStressCommentModal date={state.date} setCreateCommentModalShown={setCreateCommentModalShown} />
          </div>
        )}
    </div>
  )
}

export default Graph
