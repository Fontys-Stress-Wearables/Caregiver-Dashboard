import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
// import WorkIcon from '@mui/icons-material/Work'
// import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import CommentIcon from '@mui/icons-material/Comment'
import BarChartIcon from '@mui/icons-material/BarChart'
import IconButton from '@mui/material/IconButton'
import './table.css'

function Table() {
  return (
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
                <>
                  <IconButton aria-label="comment">
                    <CommentIcon />
                  </IconButton>
                  <IconButton aria-label="barchart">
                    <BarChartIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Patient ${value}`}
                secondary="Jan 9, 2014"
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  )
}

export default Table
