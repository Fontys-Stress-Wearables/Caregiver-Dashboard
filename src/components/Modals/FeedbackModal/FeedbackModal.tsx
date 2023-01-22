import React, { useState, Dispatch, SetStateAction } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'
import { useMsal } from '@azure/msal-react'
import {
  editFeedbackById,
  createFeedback,
  useAuthRequest,
  FeedbackProps,
} from '../../../utils/api/calls'

type Props = {
  feedbackForm: FeedbackProps
  setFeedbackForm: Dispatch<SetStateAction<FeedbackProps>>
  updateFeedback: () => void
  show: boolean
  hide: () => void
}

const FeedbackModal = ({ feedbackForm, setFeedbackForm, updateFeedback, show, hide }: Props) => {
  const { instance } = useMsal()
  const request = useAuthRequest()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFeedbackForm({ ...feedbackForm, [event.target.name]: event.target.value })
  }

  const handleSubmit = () => {
    if (feedbackForm.id === '') {
      instance.acquireTokenSilent(request).then((res) => {
        createFeedback(res.accessToken, feedbackForm).then((response) => {
          if (response.error) {
            setError(true)
          } else {
            setError(true)
            updateFeedback()
          }
        })
      })
    } else {
      instance.acquireTokenSilent(request).then((res) => {
        editFeedbackById(res.accessToken, feedbackForm).then((response) => {
          if (response.error) {
            setError(true)
          } else {
            updateFeedback()
          }
        })
      })
    }

    hide()
  }

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type='text'
              name='comment'
              placeholder='Comment'
              defaultValue={feedbackForm.comment}
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
          Save Comment
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FeedbackModal
