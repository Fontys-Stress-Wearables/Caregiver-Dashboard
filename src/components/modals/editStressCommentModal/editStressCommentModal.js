import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'
import { useMsal } from '@azure/msal-react'
import { editPatientFeedbackByFeedbackId, useAuthRequest } from '../../../utils/api/calls'

function EditStressCommentModal({ feedback, updateFeedbackList, show, hide }) {
  const { instance } = useMsal()
  const request = useAuthRequest()
  const [error, setError] = useState(false)

  const [feedbackForm, setFeedbackForm] = useState({
    id: feedback?.id,
    comment: feedback?.comment,
    patientId: feedback?.patientId,
    authorId: feedback?.authorId,
    stressMeassurementId: feedback?.stressMeassurementId,
    createdCommentDate: feedback?.createdCommentDate,
    createdStressMeasurementDate: feedback?.createdStressMeasurementDate,
  })

  const submitFeedback = () => {
    const handleFeedback = {
      id: feedback.id,
      comment: feedbackForm.comment,
      patientId: feedback.patientId,
      authorId: feedback.authorId,
      stressMeassurementId: feedback.stressMeassurementId,
      createdCommentDate: feedback.createdCommentDate,
      createdStressMeasurementDate: feedback.createdStressMeasurementDate,
    }

    console.log(handleFeedback)

    instance.acquireTokenSilent(request).then((res) => {
      editPatientFeedbackByFeedbackId(res.accessToken, handleFeedback).then((response) => {
        if (response.error) {
          setError(true)
        } else {
          updateFeedbackList(response.response)
        }
      })
    })
  }

  const handleChange = (event) => {
    console.log(feedback)
    setFeedbackForm({ ...feedbackForm, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitFeedback()
    hide()
  }

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit stress comment in the system</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              name="comment"
              placeholder={feedback?.comment}
              defaultValue={feedbackForm.comment}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Edit Comment
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditStressCommentModal
