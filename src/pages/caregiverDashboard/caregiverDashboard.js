import { useState } from 'react'
import Title from '../../components/title/titleWelcome.js'
import DropdownSearchbar from '../../components/dropdownSearchbar/dropdownSearchbar.js'
import Table from '../../components/table/table'
import BaseLayout from '../../layouts/baseLayout'

function CaregiverDashboard() {
  const [selectedGroup, setSelectedGroup] = useState()

  return (
    <BaseLayout>
      {/* eslint-disable-next-line react/style-prop-object */}
      <Title />
      <DropdownSearchbar
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <Table selectedGroup={selectedGroup} />
    </BaseLayout>
  )
}

export default CaregiverDashboard
