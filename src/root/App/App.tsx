import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import CaregiverDashboard from '../../pages/caregiver_dashboard/caregiverDashboard'
import PatientDashboard from '../../pages/patient_dashboard/patientDashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<CaregiverDashboard />} />
        <Route path="/patient/:id" element={<PatientDashboard />} />
      </Routes>
    </div>
  )
}

export default App
