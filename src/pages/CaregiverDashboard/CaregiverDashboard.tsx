import { useState } from 'react'
import Dropdown from './Dropdown/Dropdown.js'
import PatientList from './PatientList/PatientList'
import Title from './Title/Title'
import { PatientGroupProps } from '../../utils/api/calls'
import BaseLayout from '../../layouts/BaseLayout'

const CaregiverDashboard = () => {
  const [selectedGroup, setSelectedGroup] = useState<PatientGroupProps | undefined>()

  return (
    <BaseLayout>
      <Title />
      <Dropdown selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
      <PatientList patientGroup={selectedGroup} />
    </BaseLayout>
  )
}

export default CaregiverDashboard
