import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'
import { useMsal } from '@azure/msal-react'
import { updatePatient, useAuthRequest } from '../../../utils/api/calls'

function EditPatientModal({
  patientForm,
  setPatientForm,
  updatePatientList,
  show,
  hide,
}) {
  const { instance } = useMsal()
  const request = useAuthRequest()
  const [error, setError] = useState(false)

  const submitPatient = () => {
    const handlePatient = {
      id: patientForm.id,
      firstName: patientForm.firstName,
      lastName: patientForm.lastName,
      birthdate: patientForm.birthdate,
    }

    instance.acquireTokenSilent(request).then((res) => {
      updatePatient(res.accessToken, handlePatient).then((response) => {
        if (response.error) {
          setError(true)
        } else {
          updatePatientList(response.response)
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
    hide()
  }

  return (
    <Modal show={show} onHide={hide}>
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Birthdate</Form.Label>
            <Form.Control
              type="date"
              name="birthdate"
              placeholder="Date of Birth"
              defaultValue={patientForm.birthdate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
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
