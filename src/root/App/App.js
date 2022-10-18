import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CaregiverDashboard from '../../pages/caregiverDashboard/caregiverDashboard'
import StressPatientDashboard from '../../pages/stressPatientDashboard/stressPatientDashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<CaregiverDashboard />} />
          <Route exact path="/stress" element={<StressPatientDashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
