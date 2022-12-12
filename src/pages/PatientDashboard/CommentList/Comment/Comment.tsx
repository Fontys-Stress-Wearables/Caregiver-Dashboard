import { FeedbackProps } from '../../../../utils/api/calls'
import Mui from '../../../../utils/Mui'
import * as React from 'react'

type Props = {
  comment: FeedbackProps
  openModal: () => void
}

function Comment({ comment, openModal }: Props) {
  return (
    <Mui.ListItem
      disableGutters
      secondaryAction={
        <Mui.IconButton aria-label='edit' onClick={openModal}>
          <Mui.EditIcon />
        </Mui.IconButton>
      }
    >
      <Mui.ListItemAvatar>
        <Mui.Avatar>
          <Mui.ImageIcon />
        </Mui.Avatar>
      </Mui.ListItemAvatar>
      <Mui.ListItemText primary={`${comment.comment}`} secondary={comment.date} />
    </Mui.ListItem>
  )
}

export default Comment
