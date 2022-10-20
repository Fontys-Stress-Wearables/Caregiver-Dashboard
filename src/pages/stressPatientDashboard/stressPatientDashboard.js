import Title from '../../components/title/titleGraphPatient.js'
import StressComments from '../../components/stressComments/stressComments.js'
import Graph from '../../components/graph/graph'
import BaseLayout from '../../layouts/baseLayout'

function StressPatientDashboard() {
  return (
    <BaseLayout>
      {/* eslint-disable-next-line react/style-prop-object */}
      <Title />
      <Graph />
      <StressComments />
    </BaseLayout>
  )
}

export default StressPatientDashboard
