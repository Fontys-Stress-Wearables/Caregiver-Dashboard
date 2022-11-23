import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './dropdownSearchbar.css'
import { useMsal } from '@azure/msal-react'
import {
  useAuthRequest,
  getPatientGroupsForCaregiver,
} from '../../utils/api/calls'

function DropdownSearchbar({ selectedGroup, setSelectedGroup }) {
  const { instance } = useMsal()
  const request = useAuthRequest()

  const [patientGroups, setPatientGroups] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchPatientGroups()
  }, [])

  const fetchPatientGroups = () => {
    instance.acquireTokenSilent(request).then((res) => {
      getPatientGroupsForCaregiver(res.accessToken, res.uniqueId).then(
        (response) => {
          if (response.error) {
            setError(true)
          } else {
            const fetchedPatientGroups = response.response
            setError(false)
            setPatientGroups(fetchedPatientGroups)
            setSelectedGroup(fetchedPatientGroups[0])
          }
        },
      )
    })
  }

  const handleGroupSelect = (e) => {
    const group = patientGroups.find((g) => g.id === e.id)
    setSelectedGroup(group)
  }

  const getPatientGroupNames = () => {
    const nameList = []
    patientGroups.forEach((group) => {
      nameList.push({
        id: group.id,
        value: group.groupName,
        label: group.groupName,
      })
    })
    return nameList
  }

  return (
    <div className="SearchBar">
      <div
        style={{
          boxSizing: 'border-box',
          width: '100%',
          justifyContent: 'center',
          backgroundColor: 'rgb(229, 229, 229)',
          display: 'flex',
          padding: '1px',
        }}
      >
        <div style={{ width: '20%', minWidth: '23rem' }}>
          <Select
            MenuPlacement="auto"
            MenuPosition="fixed"
            options={getPatientGroupNames()}
            onChange={handleGroupSelect}
            value={selectedGroup?.value}
            placeholder="Select Patient Group"
          />
        </div>
      </div>
      <h2 className="SearchBarSelected">{selectedGroup?.groupName}</h2>
    </div>
  )
}

export default DropdownSearchbar
