import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import update from 'immutability-helper'
import Moment from 'react-moment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import PersonIcon from '@mui/icons-material/Person'
import BarChartIcon from '@mui/icons-material/BarChart'
import IconButton from '@mui/material/IconButton'
import EditPatientModal from '../modals/editPatientModal/editPatientModal'
import './patientList.css'

import {
  getPatientsForPatientGroup,
  useAuthRequest,
} from '../../utils/api/calls'

function PatientList({ selectedGroup }) {
  const { instance } = useMsal()
  const navigate = useNavigate()
  const request = useAuthRequest()

  const [error, setError] = useState(false)
  const [showPatientModal, setShowPatientModal] = useState(false)
  const [patientList, setPatientList] = useState([])
  const [patientForm, setPatientForm] = useState({
    id: null,
    firstName: null,
    lastName: null,
    birthdate: null,
  })

  const openPatientModal = (patient) => {
    setShowPatientModal(true)
    const patientInfo = {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthdate: patient.birthdate.split('T')[0],
    }
    setPatientForm(patientInfo)
  }

  useEffect(() => {
    if (selectedGroup) {
      fetchPatients()
    }
  }, [selectedGroup])

  const fetchPatients = () => {
    instance.acquireTokenSilent(request).then((res) => {
      getPatientsForPatientGroup(res.accessToken, selectedGroup.id).then(
        (response) => {
          if (response.error) {
            setError(true)
          } else {
            const fetchedPatientGroups = response.response
            setError(false)
            setPatientList(fetchedPatientGroups)
          }
        },
      )
    })
  }

  const updatePatientList = (patient) => {
    const index = patientList.findIndex((p) => p.id === patient.id)
    const updatedEmployees = update(patientList, {
      $splice: [[index, 1, patient]],
    })
    setPatientList(updatedEmployees)
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
                    onClick={() => navigate(`/patient/${patient.id}`)}
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
                primary={`${patient.firstName} ${patient.lastName}`}
                secondary={
                  <Moment date={patient.birthdate} format="DD-MM-YYYY" />
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
      <EditPatientModal
        patientForm={patientForm}
        setPatientForm={setPatientForm}
        updatePatientList={updatePatientList}
        show={showPatientModal}
        hide={() => setShowPatientModal(false)}
      />
    </div>
  )
}

export default PatientList
