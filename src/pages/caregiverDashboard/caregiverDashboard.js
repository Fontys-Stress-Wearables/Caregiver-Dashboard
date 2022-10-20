import Title from '../../components/title/titleWelcome.js'
import DropdownSearchbar from '../../components/dropdownSearchbar/dropdownSearchbar.js'
import Table from '../../components/table/table'
import BaseLayout from '../../layouts/baseLayout'

function CaregiverDashboard() {
  return (
    <BaseLayout>
      {/* eslint-disable-next-line react/style-prop-object */}
      <Title />
      <DropdownSearchbar />
      <Table />
    </BaseLayout>
  )
}

export default CaregiverDashboard
