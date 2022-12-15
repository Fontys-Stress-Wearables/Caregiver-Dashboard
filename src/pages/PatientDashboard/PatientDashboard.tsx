import Graph from './Graph/Graph'
import BaseLayout from '../../layouts/BaseLayout'
import Title from './Title/Title'
import CommentList from './CommentList/CommentList'
import DatePicker from './DatePicker/DatePicker'
import React, { useState } from 'react'

const PatientDashboard = () => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  const [dateForm, setDateForm] = useState({
    startDate: yesterday.toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  })

  return (
    <BaseLayout>
      <Title />
      <DatePicker dateForm={dateForm} setDateForm={setDateForm} />
      <Graph dateForm={dateForm} />
      <CommentList dateForm={dateForm} />
    </BaseLayout>
  )
}

export default PatientDashboard
