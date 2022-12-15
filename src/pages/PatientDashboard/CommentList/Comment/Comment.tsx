import { FeedbackProps } from '../../../../utils/api/calls'
import Mui from '../../../../utils/Mui'
import * as React from 'react'

type Props = {
  comment: FeedbackProps
  openModal: () => void
  deleteComment: () => void
}

function Comment({ comment, openModal, deleteComment }: Props) {
  return (
    <Mui.ListItem
      disableGutters
      secondaryAction={
        <div>
          <Mui.IconButton aria-label='edit' onClick={openModal}>
            <Mui.EditIcon />
          </Mui.IconButton>
          <Mui.IconButton aria-label='barchart' onClick={deleteComment}>
            <Mui.DeleteIcon />
          </Mui.IconButton>
        </div>
      }
    >
      <Mui.ListItemAvatar>
        <Mui.Avatar>
          <Mui.ImageIcon />
        </Mui.Avatar>
      </Mui.ListItemAvatar>
      <Mui.ListItemText
        primary={`${comment.comment}`}
        secondary={comment.createdCommentDate.split('T')[0]}
      />
    </Mui.ListItem>
  )
}

export default Comment
