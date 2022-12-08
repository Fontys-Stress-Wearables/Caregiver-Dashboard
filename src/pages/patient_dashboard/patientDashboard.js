import Title from '../../components/title/titlePatient.js'
import StressComments from '../../components/comments/comments.js'
import Graph from '../../components/graph/graph'
import BaseLayout from '../../layouts/baseLayout'

function PatientDashboard() {
  return (
    <BaseLayout>
      <Title />
      <Graph />
      <StressComments />
    </BaseLayout>
  )
}

export default PatientDashboard
