import { FeedbackProps } from '../../../../utils/api/calls'
import Mui from '../../../../utils/Mui'
import * as React from 'react'
import styles from './Feedback.module.scss'

type Props = {
  feedback: FeedbackProps
  openModal: () => void
  deleteFeedback: () => void
}

function Feedback({ feedback, openModal, deleteFeedback }: Props) {
  return (
    <Mui.ListItem className={styles.Container} disableGutters>
      <Mui.ListItemAvatar className={styles.Avatar}>
        <Mui.Avatar>
          <Mui.ImageIcon />
        </Mui.Avatar>
      </Mui.ListItemAvatar>
      <Mui.ListItemText
        classes={{ primary: styles.Text }}
        primary={`${feedback.comment}`}
        secondary={feedback.createdCommentDate.split('T')[0]}
      />
      <Mui.ListItemIcon className={styles.Icon}>
        <Mui.IconButton aria-label='edit' onClick={openModal}>
          <Mui.EditIcon />
        </Mui.IconButton>
      </Mui.ListItemIcon>
      <Mui.ListItemIcon className={styles.Icon}>
        <Mui.IconButton aria-label='barchart' onClick={deleteFeedback}>
          <Mui.DeleteIcon />
        </Mui.IconButton>
      </Mui.ListItemIcon>
    </Mui.ListItem>
  )
}

export default Feedback
