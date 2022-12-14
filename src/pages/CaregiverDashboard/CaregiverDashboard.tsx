import { useState } from 'react'
import PatientList from './PatientList/PatientList'
import Title from './Title/Title'
import BaseLayout from '../../layouts/BaseLayout'
import Dropdown from './Dropdown/Dropdown'
import { PatientGroupProps } from '../../utils/api/calls'

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
