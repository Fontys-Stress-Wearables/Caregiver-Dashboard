import Title from './Title/Title.tsx'
import CommentList from './CommentList/CommentList.tsx'
import Graph from '../../components/Graph/graph'
import BaseLayout from '../../layouts/BaseLayout'

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
