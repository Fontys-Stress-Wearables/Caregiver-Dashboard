import * as React from 'react'
import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import PersonIcon from '@mui/icons-material/Person'
import BarChartIcon from '@mui/icons-material/BarChart'
import IconButton from '@mui/material/IconButton'
import { useMsal } from '@azure/msal-react'
import EditPatientModal from '../editPatientModal/editPatientModal'
import './table.css'
import { getPatientsForPatientGroup } from '../../utils/api/calls'
import { AUTH_REQUEST_SCOPE_URL } from '../../utils/environment'

function Table({ selectedGroup }) {
  const { instance, accounts } = useMsal()
  const [patientList, setPatientList] = useState([])
  const [selectedPatient, setSelectedPatient] = useState()
  const [showPatientModal, setShowPatientModal] = useState(false)
  const [error, setError] = useState(false)

  const openPatientModal = (patient) => {
    setSelectedPatient(patient)
    setShowPatientModal(true)
  }

  useEffect(() => {
    if (selectedGroup) {
      fetchPatients()
    }
  }, [selectedGroup])

  const request = {
    scopes: [AUTH_REQUEST_SCOPE_URL, 'User.Read'],
    account: accounts[0],
  }

  const fetchPatients = () => {
    instance.acquireTokenSilent(request).then((res) => {
      getPatientsForPatientGroup(res.accessToken, selectedGroup.id).then(
        (response) => {
          if (response.error) {
            setError(true)
            console.log(response)
          } else {
            const fetchedPatientGroups = response.response
            setError(false)
            setPatientList(fetchedPatientGroups)
            console.log(response)
          }
        },
      )
    })
  }

  return (
    <div className="Container">
      <div className="ListContainer">
        <List className="TableList">
          {patientList.map((patient) => (
            <ListItem
              key={patient}
              disableGutters
              secondaryAction={
                <>
                  <IconButton
                    aria-label="edit"
                    onClick={() => openPatientModal(patient)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="barchart"
                    // onClick={() => navigate('/stress')}
                  >
                    <BarChartIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${patient.firstName}`}
                secondary={`${patient.lastName}`}
              />
            </ListItem>
          ))}
        </List>
      </div>

      <EditPatientModal
        patient={selectedPatient}
        show={showPatientModal}
        closeModal={() => setShowPatientModal(false)}
      />
    </div>
  )
}

export default Table
