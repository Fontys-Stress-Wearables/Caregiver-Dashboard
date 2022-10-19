import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'

function EditStressComment(props) {
  const [show, setShow] = useState(props)
  const [patient, setPatient] = useState()
  const handleClose = () => props.setPreviewShown(!props)

  const [comment, setComment] = useState('')

  const handleChangeComment = (event) => {
    setComment(event.target.value)
  }

  function handleSubmit() {
    const handlePatient = {
      comment: comment,
    }

    setPatient(handlePatient)

    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit stress comment in the system</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="string"
              placeholder="Comment"
              autoFocus
              onChange={handleChangeComment}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Edit Comment
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditStressComment
