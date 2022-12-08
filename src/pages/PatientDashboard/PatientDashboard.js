import Title from './Title/Title.tsx'
import StressComments from './Comments/Comments.tsx'
import Graph from '../../components/graph/graph'
import BaseLayout from '../../layouts/BaseLayout'

const PatientDashboard = () => {
  return (
    <BaseLayout>
      <Title />
      <Graph />
      <StressComments />
    </BaseLayout>
  )
}

export default PatientDashboard
