import React from 'react'
import './graph.css'
import LineGraph from '../../assets/line-graph.jpg'

function Graph() {
  return (
    <div>
      <h1>Graph</h1>
      <div className="GraphContainer">
        <img className="Graph" src={LineGraph} alt="Line Graph" />
      </div>
    </div>
  )
}

export default Graph
