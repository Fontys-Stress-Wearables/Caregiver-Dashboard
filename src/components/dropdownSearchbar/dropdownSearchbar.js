import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import './dropdownSearchbar.css'
import { useMsal } from '@azure/msal-react'
import { AUTH_REQUEST_SCOPE_URL } from '../../utils/environment'
import { getPatientGroupsForCaregiver } from '../../utils/api/calls'

function DropdownSearchbar() {
  const [selectedOption, setSelectedOption] = useState('Select Patient Group')
  const { instance, accounts } = useMsal()

  const aquaticCreatures = [
    { label: 'Shark', value: 'Shark' },
    { label: 'Dolphin', value: 'Dolphin' },
    { label: 'Whale', value: 'Whale' },
    { label: 'Octopus', value: 'Octopus' },
    { label: 'Crab', value: 'Crab' },
    { label: 'Lobster', value: 'Lobster' },
  ]

  const request = {
    scopes: [AUTH_REQUEST_SCOPE_URL, 'User.Read'],
    account: accounts[0],
  }

  useEffect(() => {
    fetchPatientGroups()
  })

  const fetchPatientGroups = () => {
    instance
      .acquireTokenSilent(request)
      .then((res) => {
        console.log(res)
        getPatientGroupsForCaregiver(res.accessToken, res.uniqueId)
          .then((response) => {
            if (response.error) {
              console.log(response)
            } else {
              const foundPatientGroups = response.response
              console.log(foundPatientGroups)
              // setError(false)
              // setOrganizations([...foundOrganizations])
            }
          })
          .catch((err) => {
            console.error('Error occurred while fetching organizations', err)
          })
      })
      .catch((e) => {
        console.error('Error occurred while fetching patients', e)
      })
  }

  const handleTypeSelect = (e) => {
    setSelectedOption(e.value)
  }

  return (
    <div className="SearchBar">
      {console.log(instance.getActiveAccount())}
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
            options={aquaticCreatures}
            onChange={handleTypeSelect}
            value={selectedOption}
            placeholder={selectedOption}
            // placeholder="Select Patient Group"
          />
        </div>
      </div>
      <h2 className="SearchBarSelected">{selectedOption}</h2>
    </div>
  )
}

export default DropdownSearchbar
