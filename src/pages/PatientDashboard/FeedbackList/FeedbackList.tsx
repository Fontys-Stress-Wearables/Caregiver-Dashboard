import * as React from 'react'
import { useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { FeedbackProps, deleteFeedbackById, useAuthRequest } from '../../../utils/api/calls'
import Feedback from './Feedback/Feedback'
import FeedbackModal from '../../../components/Modals/FeedbackModal/FeedbackModal'
import List from '@mui/material/List'
import styles from './FeedbackList.module.scss'

type Props = {
  feedback: FeedbackProps[]
  updateFeedback: () => void
}

const FeedbackList = ({ feedback, updateFeedback }: Props) => {
  const { instance } = useMsal()
  const request = useAuthRequest()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<boolean>(false)
  const [showFeedbackEditModal, setShowFeedbackEditModal] = useState<boolean>(false)
  const [feedbackForm, setFeedbackForm] = useState<FeedbackProps>({
    id: '',
    patientId: '',
    authorId: '',
    stressMeasurementId: '',
    comment: '',
    createdCommentDate: '',
    createdStressMeasurementDate: '',
  })

  const openCommentEditModal = (feedback: FeedbackProps) => {
    setFeedbackForm(feedback)
    setShowFeedbackEditModal(true)
  }

  const deleteFeedback = (id: string) => {
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

  return (
    <div>
      <React.Fragment>
        <div className={styles.Container}>
          <div className={styles.FeedbackListContainer}>
            <List>
              {feedback.map((feedback) => (
                <Feedback
                  key={feedback.id}
                  feedback={feedback}
                  openModal={() => openCommentEditModal(feedback)}
                  deleteFeedback={() => deleteFeedback(feedback.id)}
                />
              ))}
            </List>
          </div>
        </div>
        <FeedbackModal
          feedbackForm={feedbackForm}
          setFeedbackForm={setFeedbackForm}
          updateFeedback={updateFeedback}
          show={showFeedbackEditModal}
          hide={() => setShowFeedbackEditModal(false)}
        />
      </React.Fragment>
    </div>
  )
}

export default FeedbackList
