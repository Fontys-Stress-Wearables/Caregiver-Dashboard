import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'
import { useMsal } from '@azure/msal-react'
import {
  getPatientsForPatientGroup,
  updatePatient,
  useAuthRequest,
} from '../../../utils/api/calls'

function EditPatientModal({ patient, show, closeModal }) {
  const { instance } = useMsal()
  const request = useAuthRequest()
  const [error, setError] = useState(false)

  const [patientForm, setPatientForm] = useState({
    firstName: patient.firstName || '',
    lastName: patient.lastName || '',
    birthDate: patient.birthDate || '',
  })

  const submitPatient = () => {
    instance.acquireTokenSilent(request).then((res) => {
      updatePatient(res.accessToken, patientForm).then((response) => {
        if (response.error) {
          setError(true)
          console.log(response)
        } else {
          console.log(response)
        }
      })
    })
  }

  const handleChange = (event) => {
    setPatientForm({ ...patientForm, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    submitPatient()

    console.log(patientForm)

    closeModal()
  }

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First name"
              defaultValue={patientForm.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last name"
              defaultValue={patientForm.lastName}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Edit Patient
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditPatientModal
