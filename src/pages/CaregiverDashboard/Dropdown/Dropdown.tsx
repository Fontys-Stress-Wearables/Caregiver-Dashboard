import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import Select from 'react-select'
import { useMsal } from '@azure/msal-react'
import {
  useAuthRequest,
  getPatientGroupsForCaregiver,
  PatientGroupProps,
} from '../../../utils/api/calls'
import styles from './Dropdown.module.scss'

type Props = {
  selectedGroup: PatientGroupProps | undefined
  setSelectedGroup: Dispatch<SetStateAction<PatientGroupProps | undefined>>
}

function Dropdown({ selectedGroup, setSelectedGroup }: Props) {
  const { instance } = useMsal()
  const request = useAuthRequest()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false)
  const [patientGroups, setPatientGroups] = useState<PatientGroupProps[] | []>([])

  useEffect(() => {
    fetchPatientGroups()
  }, [])

  const fetchPatientGroups = () => {
    instance.acquireTokenSilent(request).then((res) => {
      getPatientGroupsForCaregiver(res.accessToken, res.uniqueId).then((response) => {
        if (response.error) {
          setError(true)
        } else {
          const fetchedPatientGroups = response.response
          setError(false)
          setPatientGroups(fetchedPatientGroups)
          setSelectedGroup(fetchedPatientGroups[0])
        }
      })
    })
  }

  const handleGroupSelect = (id: string | undefined) => {
    if (!id) return
    const group = patientGroups.find((g) => g.id === id)
    if (group) setSelectedGroup(group)
  }

  const getPatientGroupNames = () => {
    const nameList: { id: string | undefined; value: string; label: string }[] = []
    patientGroups.forEach((group) => {
      nameList.push({
        id: group.id,
        value: group.groupName,
        label: group.groupName,
      })
    })
    return nameList
  }

  const getSelectedGroup = () => ({
    id: selectedGroup?.id,
    value: selectedGroup?.groupName,
    label: selectedGroup?.groupName,
  })

  return (
    <div className={styles.Container}>
      <div className={styles.Dropdown}>
        <div className={styles.Selection}>
          <Select
            value={getSelectedGroup()}
            options={getPatientGroupNames()}
            onChange={(option) => handleGroupSelect(option?.id)}
            placeholder='Select Patient Group'
          />
        </div>
      </div>
      <h2 className={styles.Selected}>{selectedGroup?.groupName}</h2>
    </div>
  )
}

export default Dropdown
