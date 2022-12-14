import Moment from 'moment'
import { useNavigate } from 'react-router-dom'
import Mui from '../../../../utils/Mui'
import { PatientProps } from '../../../../utils/api/calls'

type Props = {
  patient: PatientProps
  openPatientModal: (patient: PatientProps) => void
}

const Patient = ({ patient, openPatientModal }: Props) => {
  const navigate = useNavigate()

  return (
    <Mui.ListItem
      key={patient.id}
      disableGutters
      secondaryAction={
        <div>
          <Mui.IconButton aria-label='edit' onClick={() => openPatientModal(patient)}>
            <Mui.EditIcon />
          </Mui.IconButton>
          <Mui.IconButton aria-label='barchart' onClick={() => navigate(`/patient/${patient.id}`)}>
            <Mui.BarChartIcon />
          </Mui.IconButton>
        </div>
      }
    >
      <Mui.ListItemAvatar>
        <Mui.Avatar>
          <Mui.PersonIcon />
        </Mui.Avatar>
      </Mui.ListItemAvatar>
      <Mui.ListItemText
        primary={`${patient.firstName} ${patient.lastName}`}
        secondary={Moment(patient.birthdate).format('DD-MM-YYYY')}
      />
    </Mui.ListItem>
  )
}

export default Patient
