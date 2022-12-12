import Graph from '../../components/Graph/graph'
import BaseLayout from '../../layouts/BaseLayout'
import Title from './Title/Title'
import CommentList from './CommentList/CommentList'

const PatientDashboard = () => {
  return (
    <BaseLayout>
      <Title />
      <Graph />
      <CommentList />
    </BaseLayout>
  )
}

export default PatientDashboard
