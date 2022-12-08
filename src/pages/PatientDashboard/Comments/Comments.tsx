import * as React from 'react'
import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import CommentModal from '../../../components/modals/CommentModal/CommentModal'
import styles from './Comments.module.scss'
import { MockComments } from './MockComments'
import { FeedbackProps } from '../../../utils/api/calls'

const Comments = () => {
  const [list] = useState(MockComments)
  const [showCommentEditModal, setShowCommentEditModal] = useState(false)
  const [commentForm, setCommentForm] = useState({})

  const openCommentEditModal = (feedback: FeedbackProps) => {
    const commentInfo = {
      id: feedback.id,
      comment: feedback.comment,
      feedback: feedback.date,
    }
    setCommentForm(commentInfo)
    setShowCommentEditModal(true)
  }

  return (
    <React.Fragment>
      <div className={styles.Container}>
        <div className={styles.CommentListContainer}>
          <List>
            {list.map((value) => (
              <ListItem
                key={value.id}
                disableGutters
                secondaryAction={
                  <IconButton aria-label='edit' onClick={() => openCommentEditModal(value)}>
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${value.comment}`} secondary={value.date} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>

      <CommentModal
        commentForm={commentForm}
        setCommentForm={setCommentForm}
        show={showCommentEditModal}
        hide={() => setShowCommentEditModal(false)}
      />
    </React.Fragment>
  )
}

export default Comments
