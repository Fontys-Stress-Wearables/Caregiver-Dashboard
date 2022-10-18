import './caregiverDashboard.css'
import Header from '../../components/header/header.js'
import Title from '../../components/title/titleWelcome.js'
import DropdownSearchbar from '../../components/dropdownSearchbar/dropdownSearchbar.js'
import Table from '../../components/table/table'
import CreatePatientModal from '../../components/createPatientModal/createPatientModal'

function CaregiverDashboard() {
  return (
    <div className="BodyContainer">
      <Header />
      <Title />
      <DropdownSearchbar />
      <Table />
    </div>
  )
}

export default CaregiverDashboard
