export default function graphOptions(configuration) {
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
