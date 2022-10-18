import * as React from 'react'
import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import PersonIcon from '@mui/icons-material/Person'
import BarChartIcon from '@mui/icons-material/BarChart'
import IconButton from '@mui/material/IconButton'
import CreatePatientModal from '../createPatientModal/createPatientModal'
import './table.css'
import { useNavigate } from 'react-router-dom'

function Table() {
  const navigate = useNavigate()
  const initialList = [
    {
      id: 0,
      name: 'Milan',
      lastname: 'Koster van Groos',
    },
    {
      id: 1,
      name: 'Michael',
      lastname: 'Osusomething',
    },
    {
      id: 3,
      name: 'Marinda',
      lastname: 'Boshoff',
    },
  ]
  const [list, setList] = React.useState(initialList)
  const [updatePatientInfo, setUpdatePatientInfo] = React.useState(false)
  const [isPreviewShown, setPreviewShown] = useState(false)

  const handlePreview = (e) => {
    e.preventDefault()
    console.log('hi')
    console.log(isPreviewShown)

    setPreviewShown(!isPreviewShown) // Here we change state
    console.log(isPreviewShown)
  }
  function handleToggleComplete(id) {
    console.log(id)
    console.log(updatePatientInfo)
    setUpdatePatientInfo(!updatePatientInfo)
    console.log(updatePatientInfo)
    const newList = list.map((value) => {
      if (value.id === id) {
        console.log(id)
        const updatedItem = {
          ...value,
          lastname: !value.lastname,
        }

        return updatedItem
      }

      return value
    })

    setList(newList)
  }
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
          {list.map((value) => (
            <ListItem
              key={value}
              disableGutters
              secondaryAction={
                <>
                  <IconButton aria-label="edit" onClick={handlePreview}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="barchart"
                    onClick={() => navigate('/stress')}
                  >
                    <BarChartIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`Patient ${value.name}`}
                secondary={`${value.lastname}`}
              />
            </ListItem>
          ))}
        </List>
      </div>
      {isPreviewShown && (
        <div>
          {console.log(isPreviewShown)}
          <CreatePatientModal setPreviewShown={setPreviewShown} />
          {handlePreview}
          {console.log(isPreviewShown)}
        </div>
      )}
    </div>
  )
}

export default Table
