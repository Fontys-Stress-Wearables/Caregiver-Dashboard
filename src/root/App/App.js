import './App.css'
import { Routes, Route } from 'react-router-dom'
import CaregiverDashboard from '../../pages/caregiverDashboard/caregiverDashboard'
import StressPatientDashboard from '../../pages/stressPatientDashboard/stressPatientDashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<CaregiverDashboard />} />
        <Route exact path="/stress" element={<StressPatientDashboard />} />
      </Routes>
    </div>
  )
}

export default App
