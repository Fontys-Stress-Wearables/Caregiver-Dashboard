import React, { useState } from 'react'
import Select from 'react-select'
import './dropdownSearchbar.css'

function DropdownSearchbar() {
  const [selectedOption, setSelectedOption] = useState('Select Patient Group')

  const aquaticCreatures = [
    { label: 'Shark', value: 'Shark' },
    { label: 'Dolphin', value: 'Dolphin' },
    { label: 'Whale', value: 'Whale' },
    { label: 'Octopus', value: 'Octopus' },
    { label: 'Crab', value: 'Crab' },
    { label: 'Lobster', value: 'Lobster' },
  ]

  const handleTypeSelect = (e) => {
    setSelectedOption(e.value)
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
        <div style={{ width: '50%' }}>
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
      <h2>{selectedOption}</h2>
    </div>
  )
}

export default DropdownSearchbar
