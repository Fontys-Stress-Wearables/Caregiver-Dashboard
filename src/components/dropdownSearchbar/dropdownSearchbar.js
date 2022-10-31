import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './dropdownSearchbar.css'
import { useMsal } from '@azure/msal-react'
import { AUTH_REQUEST_SCOPE_URL } from '../../utils/environment'
import { getPatientGroupsForCaregiver } from '../../utils/api/calls'

function DropdownSearchbar() {
  const [selectedOption, setSelectedOption] = useState('Select Patient Group')
  const [updateTable, setUpdateTable] = useState(false)
  const { instance, accounts } = useMsal()
  const [error, setError] = useState(false)
  const [patientGroups, setPatientGroups] = useState([])

  const request = {
    scopes: [AUTH_REQUEST_SCOPE_URL, 'User.Read'],
    account: accounts[0],
  }

  useEffect(() => {
    fetchPatientGroups()
  }, [updateTable])

  const fetchPatientGroups = () => {
    instance
      .acquireTokenSilent(request)
      .then((res) => {
        getPatientGroupsForCaregiver(res.accessToken, res.uniqueId)
          .then((response) => {
            if (response.error) {
              setError(true)
            } else {
              const fetchedPatientGroups = response.response
              setError(false)
              setPatientGroups(fetchedPatientGroups)
            }
          })
          .catch((err) => {
            console.error('Error occurred while fetching organizations', err)
            setError(true)
          })
      })
      .catch((e) => {
        console.error('Error occurred while fetching patients', e)
        setError(true)
      })
  }

  const handleTypeSelect = (e) => {
    setSelectedOption(e.value)
  }

  const getPatientGroupNames = () => {
    const nameList = []
    patientGroups.forEach((element) => {
      nameList.push({
        label: element.groupName,
        value: element.groupName,
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
            onChange={handleTypeSelect}
            value={selectedOption}
            placeholder={selectedOption}
          />
        </div>
      </div>
      <h2 className="SearchBarSelected">{selectedOption}</h2>
    </div>
  )
}

export default DropdownSearchbar
