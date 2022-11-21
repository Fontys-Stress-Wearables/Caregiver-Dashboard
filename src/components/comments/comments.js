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
import EditStressCommentModal from '../modals/editStressCommentModal/editStressCommentModal'
import CreateStressCommentModal from '../modals/createStressCommentModal/createStressCommentModal'
import './comments.css'

function StressComment() {
  const initialList = [
    {
      id: 0,
      comment: 'Experienced number jumpscare from scary movie',
      date: 'Jan 9, 2014 at a.m.',
    },
    {
      id: 1,
      comment: 'Experienced number jumpscare from scary movie',
      date: 'Jan 9, 2014 at a.m.',
    },
    {
      id: 3,
      comment:
        'Experienced number jumpscare scary. Experienced number from scary movie. number jumpscare from scary movie',
      date: 'Jan 9, 2014 at a.m.',
    },
  ]
  const [list, setList] = React.useState(initialList)
  const [updatePatientInfo, setUpdatePatientInfo] = React.useState(false)
  const [isPreviewShown, setPreviewShown] = useState(false) // edit comment
  const [isCreateCommentModalShown, setCreateCommentModalShown] =
    useState(false) // create comment
  const [state, setstate] = useState({ comment: '' })

  // edit comment modal handler
  const handlePreview = (e, comment) => {
    e.preventDefault()
    setstate({ comment })
    setPreviewShown(!isPreviewShown) // Here we change state
  }

  return (
    <div className="StressCommentsContainer">
      <div className="CenterContainer">
        <div className="CommentListContainer">
          <List className="CommentList">
            {list.map((value) => (
              <ListItem
                key={value.id}
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="edit"
                    onClick={(e) => handlePreview(e, value.comment)}
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
                  primary={`${value.comment}`}
                  secondary={value.date}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div>
        {isPreviewShown && (
          <div>
            <EditStressCommentModal
              comment={state.comment}
              setPreviewShown={setPreviewShown}
            />
          </div>
        )}
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
    </div>
  )
}

export default StressComment