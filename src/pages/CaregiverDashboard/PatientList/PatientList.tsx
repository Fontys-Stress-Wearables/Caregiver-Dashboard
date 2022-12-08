import * as React from 'react'
import { useEffect, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import update from 'immutability-helper'
import Mui from '../../../utils/Mui'
import PatientEditModal from '../../../components/Modals/PatientEditModal/PatientEditModal'
import styles from './PatientList.module.scss'

import {
  getPatientsForPatientGroup,
  PatientGroupProps,
  PatientProps,
  useAuthRequest,
} from '../../../utils/api/calls'

import Patient from './Patient/Patient'

type Props = {
  patientGroup: PatientGroupProps | undefined
}

const PatientList = ({ patientGroup }: Props) => {
  const { instance } = useMsal()
  const request = useAuthRequest()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false)
  const [showPatientModal, setShowPatientModal] = useState(false)
  const [patientList, setPatientList] = useState<PatientProps[]>([])
  const [patientForm, setPatientForm] = useState({})

  useEffect(() => {
    if (patientGroup) {
      fetchPatients()
    }
  }, [patientGroup])

  const fetchPatients = () => {
    instance.acquireTokenSilent(request).then((res) => {
      if (!patientGroup?.id) return

      getPatientsForPatientGroup(res.accessToken, patientGroup.id).then((response) => {
        if (response.error) {
          setError(true)
        } else {
          const fetchedPatientGroups = response.response
          setError(false)
          setPatientList(fetchedPatientGroups)
        }
      })
    })
  }

  const updatePatientList = (patient: PatientProps) => {
    const index = patientList.findIndex((p) => p.id === patient.id)
    const updatedEmployees = update(patientList, {
      $splice: [[index, 1, patient]],
    })
    setPatientList(updatedEmployees)
  }

  const openPatientModal = (patient: PatientProps) => {
    const patientInfo = {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthdate: patient.birthdate.split('T')[0],
    }
    setPatientForm(patientInfo)
    setShowPatientModal(true)
  }

  return (
    <div className={styles.Container}>
      <div className={styles.List}>
        <Mui.List className={styles.Table}>
          {patientList.map((patient) => (
            <Patient key={patient.id} patient={patient} openPatientModal={openPatientModal} />
          ))}
        </Mui.List>
      </div>
      <PatientEditModal
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
