import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'

function EditPatientModal(props) {
  const [show, setShow] = useState(props)
  const [patient, setPatient] = useState()
  const handleClose = () => props.setPreviewShown(!props)
  const handleShow = () => props.setPreviewShown(!props)

  const [firstname, setFirstname] = useState('')

  const handleChangeFirstname = (event) => {
    setFirstname(event.target.value)
  }

  const [lastname, setLastname] = useState('')

  const handleChangeLastname = (event) => {
    setLastname(event.target.value)
  }

  const [date, setDate] = useState('')

  function handleSubmit() {
    const handlePatient = {
      firstName: firstname,
      lastName: lastname,
      birthdate: date,
    }

    setPatient(handlePatient)

    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit patient in the system</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="string"
              placeholder="First name"
              autoFocus
              onChange={handleChangeFirstname}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="string"
              placeholder="Last name"
              autoFocus
              onChange={handleChangeLastname}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Edit Patient
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditPatientModal
