import './stressPatientDashboard.css'
import Header from '../../components/header/header.js'
import Title from '../../components/title/titleGraphPatient.js'
import StessComment from '../../components/stressComment/stressComment.js'
import Graph from '../../components/graph/graph'

function StressPatientDashboard() {
  return (
    <div className="body">
      <Header />
      <Title />
      <Graph />
      <StessComment />
    </div>
  )
}

export default StressPatientDashboard
