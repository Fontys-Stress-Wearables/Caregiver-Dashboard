import './App.css'
// import { Routes, Route } from 'react-router-dom'
// import { Routes, Route, Navigate } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CaregiverDashboard from '../../layouts/caregiverDashboard/caregiverDashboard'
import StressPatientDashboard from '../../layouts/stressPatientDashboard/stressPatientDashboard'

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
