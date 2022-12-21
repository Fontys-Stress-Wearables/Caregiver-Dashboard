import React, { useState, Dispatch, SetStateAction } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/esm/Form'
import Modal from 'react-bootstrap/esm/Modal'
import { useMsal } from '@azure/msal-react'
import { editFeedbackById, createFeedback, useAuthRequest, FeedbackProps } from '../../../utils/api/calls'

type Props = {
  commentForm: FeedbackProps
  setCommentForm: Dispatch<SetStateAction<FeedbackProps>>
  updateFeedback: () => void
  show: boolean
  hide: () => void
}

const CommentModal = ({ commentForm, setCommentForm, updateFeedback, show, hide }: Props) => {
  const { instance } = useMsal()
  const request = useAuthRequest()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCommentForm({ ...commentForm, [event.target.name]: event.target.value })
  }

  const handleSubmit = () => {
    console.log(commentForm)
    console.log(commentForm.id)
    console.log(commentForm.id === '')
    if (commentForm.id === '') {
      instance.acquireTokenSilent(request).then((res) => {
        createFeedback(res.accessToken, commentForm).then((response) => {
          if (response.error) {
            setError(true)
          } else {
            updateFeedback()
          }
        })
      })
    } else {
      console.log(commentForm)
      instance.acquireTokenSilent(request).then((res) => {
        editFeedbackById(res.accessToken, commentForm).then((response) => {
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
          Save Comment
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CommentModal
