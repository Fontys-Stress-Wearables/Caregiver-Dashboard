import { useState } from 'react'
import Title from './title/title.jsx'
import DropdownSearchbar from '../../components/dropdownSearchbar/dropdownSearchbar.js'
import PatientList from '../../components/patientList/patientList'
import BaseLayout from '../../layouts/baseLayout'

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
