import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'

function CreatePatientModal(props) {
  console.log(props)
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

  const handleChangeDate = (event) => {
    setDate(event.target.value)
  }

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
    <>
      {/* <Button onClick={handleShow}>Add patient</Button> */}
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
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                type="date"
                placeholder="Birthdate"
                autoFocus
                max={new Date().toISOString().split('T')[0]}
                onChange={handleChangeDate}
              />
            </Form.Group> */}
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
    </>
  )
}

export default CreatePatientModal
