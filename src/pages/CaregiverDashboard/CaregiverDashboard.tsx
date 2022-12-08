import { useState } from 'react'
import DropdownSearchbar from './dropdownSearchbar/dropdownSearchbar.js'
import PatientList from './PatientList/PatientList'
import BaseLayout from '../../layouts/baseLayout'
import Title from './Title/Title'
import { PatientGroupProps } from '../../utils/api/calls'

function CaregiverDashboard() {
  const [selectedGroup, setSelectedGroup] = useState<PatientGroupProps | undefined>()

  return (
    <BaseLayout>
      <div>
        <Title />
        <DropdownSearchbar selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
        <PatientList patientGroup={selectedGroup} />
      </div>
    </BaseLayout>
  )
}

export default CaregiverDashboard
