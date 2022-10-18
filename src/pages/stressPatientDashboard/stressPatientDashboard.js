import './stressPatientDashboard.css'
import Header from '../../components/header/header.js'
import Title from '../../components/title/titleGraphPatient.js'
import StessComments from '../../components/stressComments/stressComments.js'
import Graph from '../../components/graph/graph'

function StressPatientDashboard() {
  return (
    <div>
      <Header />
      <Title />
      <Graph />
      <StessComments />
    </div>
  )
}

export default StressPatientDashboard
