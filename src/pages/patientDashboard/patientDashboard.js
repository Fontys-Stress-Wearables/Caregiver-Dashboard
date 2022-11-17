import Title from '../../components/title/titlePatient.js'
import StressComments from '../../components/stressComments/stressComments.js'
import Graph from '../../components/graph/graph'
import BaseLayout from '../../layouts/baseLayout'

function PatientDashboard() {
  return (
    <BaseLayout>
      {/* eslint-disable-next-line react/style-prop-object */}
      <Title />
      <Graph />
      <StressComments />
    </BaseLayout>
  )
}

export default PatientDashboard
