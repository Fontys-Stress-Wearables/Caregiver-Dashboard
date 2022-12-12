const commentDataPointColor = 'rgb(25,25,112, 0.8)'
const dataPointColor = 'rgb(30, 144, 255, 0.5)'
const graphColor = 'rgb(30, 144, 255)'

const setBackgroundColor = (ctx) => {
  if (ctx.raw && ctx.raw.comment) {
    return commentDataPointColor
  }
  return dataPointColor
}

// datasets for graph
export function getGraphData(data) {
  return {
    datasets: [
      {
        data: data,
        borderColor: graphColor,
        backgroundColor: setBackgroundColor,
        pointRadius: 6,
      },
    ],
  }
}

export function graphOptions() {
  return {
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
      xAxis: {
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
}

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
