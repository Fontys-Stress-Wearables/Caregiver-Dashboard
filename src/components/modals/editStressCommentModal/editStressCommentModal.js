import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'

function EditStressCommentModal({ commentForm, setCommentForm, show, hide }) {
  const handleChange = (event) => {
    setCommentForm({ ...commentForm, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // submitComment()

    hide()
  }

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit stress comment in the system</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type='text'
              name='comment'
              placeholder='Comment'
              defaultValue={commentForm.comment}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={hide}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Edit Comment
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditStressCommentModal
