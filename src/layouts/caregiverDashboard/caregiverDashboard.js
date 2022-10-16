import './caregiverDashboard.css'
import Header from '../../components/header/header.js'
import Title from '../../components/title/title.js'
import DropdownSearchbar from '../../components/dropdownSearchbar/dropdownSearchbar.js'
import Table from '../../components/table/table'

function CaregiverDashboard() {
  return (
    <div className="body">
      <Header />
      <Title />
      <DropdownSearchbar />
      <Table />
    </div>
  )
}

export default CaregiverDashboard
