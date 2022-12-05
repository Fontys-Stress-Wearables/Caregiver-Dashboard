import { useState } from 'react'
import Title from '../../components/title/titleWelcome.js'
import DropdownSearchbar from '../../components/dropdownSearchbar/dropdownSearchbar.js'
import PatientList from '../../components/patientList/patientList'
import BaseLayout from '../../layouts/baseLayout'

function CaregiverDashboard() {
  const [selectedGroup, setSelectedGroup] = useState()

  return (
    <BaseLayout>
      <Title />
      <DropdownSearchbar
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <PatientList selectedGroup={selectedGroup} />
    </BaseLayout>
  )
}

export default CaregiverDashboard
