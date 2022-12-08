import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import CaregiverDashboard from '../../pages/caregiverDashboard/caregiverDashboard'
import PatientDashboard from '../../pages/patientDashboard/patientDashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<CaregiverDashboard />} />
        <Route path="/stress/:id" element={<PatientDashboard />} />
      </Routes>
    </div>
  )
}

export default App
