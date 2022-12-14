import * as React from 'react'
import { useState, useEffect } from 'react'
import { useMsal } from '@azure/msal-react'
import { useParams } from 'react-router-dom'
import { FeedbackProps, getFeedbackByPatientId, deleteFeedbackById, useAuthRequest, createFeedback } from '../../../utils/api/calls'
import Comment from './Comment/Comment'
import CommentModal from '../../../components/Modals/CommentModal/CommentModal'
import List from '@mui/material/List'
import styles from './CommentList.module.scss'
import Button from 'react-bootstrap/esm/Button'

const CommentList = () => {
  const { id } = useParams()
  const { instance } = useMsal()
  const request = useAuthRequest()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<boolean>(false)
  const [comments, setComments] = React.useState<FeedbackProps[]>([])
  const [showCommentEditModal, setShowCommentEditModal] = useState<boolean>(false)
  const [commentForm, setCommentForm] = useState<FeedbackProps>({
    id: '',
    patientId: '',
    authorId: '',
    stressMeasurementId: '',
    comment: '',
    createdCommentDate: '',
    createdStressMeasurementDate: '',
  })

  useEffect(() => {
    getPatientFeedback()
  }, [id])

  const getPatientFeedback = () => {
    if (id == undefined) return

    instance.acquireTokenSilent(request).then((res) => {
      getFeedbackByPatientId(res.accessToken, id).then((response) => {
        if (response.error) {
          setError(true)
        } else {
          setError(false)
          const fetchedPatientFeedback = response.response
          setComments(fetchedPatientFeedback)
        }
      })
    })
  }

  const deletePatientFeedback = (id: string) => {
    if (id == undefined) return

    instance.acquireTokenSilent(request).then((res) => {
      deleteFeedbackById(res.accessToken, id).then((response) => {
        if (response.error) {
          setError(true)
        } else {
          setError(false)
          updateFeedback()
        }
      })
    })
  }

  const openCommentEditModal = (feedback: FeedbackProps) => {
    setCommentForm(feedback)
    setShowCommentEditModal(true)
  }

  const openCommentModal = () => {
    
    setShowCommentEditModal(true)
  }

  const deleteComment = (id: string) => {
    deletePatientFeedback(id)
  }

  // const createComment = (feedback: FeedbackProps) => {
  //   if (feedback == undefined) return

  //   instance.acquireTokenSilent(request).then((res) => {
  //     createFeedback(res.accessToken, feedback).then((response) => {
  //       if (response.error) {
  //         setError(true)
  //       } else {
  //         setError(false)
  //         updateFeedback()
  //       }
  //     })
  //   })
  // }

  const updateFeedback = () => {
    // ToDo this should mutate comments first
    getPatientFeedback()
  }

  return (
    <div>
    {/* <Button variant='primary' onClick={() => openCommentModal()}>Create Comment</Button> */}
    <React.Fragment>
      
      <div className={styles.Container}>
      
        <div className={styles.CommentListContainer}>
          <List>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                openModal={() => openCommentEditModal(comment)}
                deleteComment={() => deleteComment(comment.id)}
              />
            ))}
          </List>
        </div>
      </div>

      <CommentModal
        commentForm={commentForm}
        setCommentForm={setCommentForm}
        updateFeedback={updateFeedback}
        show={showCommentEditModal}
        hide={() => setShowCommentEditModal(false)}
      />
    </React.Fragment>
    </div>
  )
}

export default CommentList
