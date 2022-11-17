import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'

function CreateStressCommentModal(props) {
  const [show, setShow] = useState(props)
  const [stressComment, setStressComment] = useState()
  const handleClose = () => props.setCreateCommentModalShown(!props)

  const [comment, setComment] = useState('')

  const handleChangeComment = (event) => {
    setComment(event.target.value)
  }

  const [date, setDate] = useState('')

  const handleChangeDate = (event) => {
    setDate(event.target.value)
  }

  function handleSubmit() {
    const handleStressComment = {
      comment,
      commentDate: date,
    }

    setStressComment(handleStressComment)

    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a new comment in the system</Modal.Title>
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Comment Date</Form.Label>
            <Form.Control
              type="date"
              value={props.date}
              autoFocus
              max={new Date().toISOString().split('T')[0]}
              onChange={handleChangeDate}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Submit Comment
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateStressCommentModal