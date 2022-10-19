import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import EditStressCommentModal from '../editStressCommentModal/editStressCommentModal'
import CreateStressCommentModal from '../createStressCommentModal/createStressCommentModal'
import './stressComments.css'

function StessComment() {
  const navigate = useNavigate()
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
      comment: 'Experienced number jumpscare from scary movie',
      date: 'Jan 9, 2014 at a.m.',
    },
  ]
  const [list, setList] = React.useState(initialList)
  const [updatePatientInfo, setUpdatePatientInfo] = React.useState(false)
  const [isPreviewShown, setPreviewShown] = useState(false)

  const handlePreview = (e) => {
    e.preventDefault()
    setPreviewShown(!isPreviewShown) // Here we change state
  }
  return (
    <div className="StressCommentsContainer">
      <h2> Data Info </h2>
      <div className="createCommentContainer">
        <div className="createStressCommentModal">
          <CreateStressCommentModal />
        </div>
      </div>
      <div className="CenterContainer">
        <div className="ListContainer">
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              backgroundColor: 'rgb(232, 229, 229)',
            }}
          >
            {list.map((value) => (
              <ListItem
                key={value}
                disableGutters
                secondaryAction={
                  <IconButton aria-label="edit" onClick={handlePreview}>
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
      {isPreviewShown && (
        <div>
          <EditStressCommentModal setPreviewShown={setPreviewShown} />
          {handlePreview}
        </div>
      )}
    </div>
  )
}

export default StessComment
