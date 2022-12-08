import { useState } from 'react'
import DropdownSearchbar from '../../components/dropdownSearchbar/dropdownSearchbar.js'
import PatientList from '../../components/patientList/patientList'
import BaseLayout from '../../layouts/baseLayout'
import Title from './Title/Title'

function CaregiverDashboard() {
  const [selectedGroup, setSelectedGroup] = useState()

  return (
    <BaseLayout>
      <div>
        <Title />
        <DropdownSearchbar
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
        <PatientList selectedGroup={selectedGroup} />
      </div>
    </BaseLayout>
  )
}

export default CaregiverDashboard
