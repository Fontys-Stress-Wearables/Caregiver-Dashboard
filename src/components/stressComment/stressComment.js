import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import './stressComment.css'

function StessComment() {
  return (
    <div className="StessCommentContainer">
      <h2> Data Info </h2>
      <div className="Container">
        <div className="ListContainer">
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              backgroundColor: 'rgb(232, 229, 229)',
            }}
          >
            {[1, 2, 3].map((value) => (
              <ListItem
                key={value}
                disableGutters
                secondaryAction={
                  <IconButton edge="end" aria-label="edit">
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
                  primary={`Experienced number ${value} jumpscare from scary movie`}
                  secondary={`Jan 9, 2014 at ${value} a.m.`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  )
}

export default StessComment
