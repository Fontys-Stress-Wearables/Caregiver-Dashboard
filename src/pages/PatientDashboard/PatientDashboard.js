import Title from './Title/Title.tsx'
import Comments from './Comments/Comments.tsx'
import Graph from '../../components/graph/graph'
import BaseLayout from '../../layouts/BaseLayout'

const PatientDashboard = () => {
  return (
    <BaseLayout>
      <Title />
      <Graph />
      <Comments />
    </BaseLayout>
  )
}

export default PatientDashboard
