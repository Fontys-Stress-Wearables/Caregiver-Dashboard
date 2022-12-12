import * as React from 'react'
import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import EditStressCommentModal from '../modals/editStressCommentModal/editStressCommentModal'
import CreateStressCommentModal from '../modals/createStressCommentModal/createStressCommentModal'
import './comments.css'
import { useMsal } from '@azure/msal-react'
import { useParams } from 'react-router-dom'
import { getPatientFeedbackById, useAuthRequest } from '../../utils/api/calls'
import update from 'immutability-helper'

function StressComment() {
  const { instance } = useMsal()
  const { id } = useParams()
  const request = useAuthRequest()

  useEffect(() => {
    if (id) {
      getPatientFeedback()
    }
  }, [])

  const initialList = [
    {
      id: 0,
      patientId: 0,
      authorId: 0,
      stressMeassurementId: 0,
      comment : '',
      createdCommentDate : new Date(),
      createdStressMeasurementDate: new Date(),
    },
  ]
  const [list, setList] = React.useState(initialList)
  const [updatePatientInfo, setUpdatePatientInfo] = React.useState(false)
  const [isPreviewShown, setPreviewShown] = useState(false) // edit comment
  const [isCreateCommentModalShown, setCreateCommentModalShown] =
    useState(false) // create comment
  const [state, setstate] = useState({ comment: '', isPreviewShown: false })
  const [error, setError] = useState(false)

  const [selectedFeedback, setSelectedFeedback] = useState()
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)


  const getPatientFeedback = () => {
    console.log("getPatientFeedbackComment")
    instance.acquireTokenSilent(request).then((res) => {
      getPatientFeedbackById(res.accessToken, id).then((response) => {
        if (response.error) {
          console.log(response)
          setError(true)
        } else {
          console.log("no error")
          console.log(response)
          const fetchedPatientFeedback = response.response
          console.log(fetchedPatientFeedback)
          setError(false)
          setList(fetchedPatientFeedback)
        }
      })
    })
  }

  const openFeedbackModal = (feedback) => {
    console.log(feedback)
    setSelectedFeedback(feedback)
    setShowFeedbackModal(true)
  }

  const updateFeedbackList = () => {
    getPatientFeedback()
  }

  return (
    <div className="StressCommentsContainer">
      <div className="CenterContainer">
        <div className="CommentListContainer">
          <List className="CommentList">
            {list.map((feedback) => (
              <ListItem
                key={feedback.id}
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="edit"
                    onClick={(e) => openFeedbackModal(feedback)}
                  >
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${feedback.comment}`}
                  secondary={feedback.date}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div>
        {isCreateCommentModalShown && (
          <div>
            <CreateStressCommentModal
              setCreateCommentModalShown={setCreateCommentModalShown}
            />
          </div>
        )}
      </div>
      <EditStressCommentModal
        feedback={selectedFeedback}
        updateFeedbackList={updateFeedbackList}
        show={showFeedbackModal}
        hide={() => setShowFeedbackModal(false)}
      />
    </div>
  )
}

export default StressComment
