import * as React from 'react'
import styles from './DatePicker.module.scss'
import { Col, Row, Form } from 'react-bootstrap'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  dateForm: { startDate: string; endDate: string }
  setDateForm: Dispatch<SetStateAction<{ startDate: string; endDate: string }>>
}

const DatePicker = ({ dateForm, setDateForm }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDateForm({ ...dateForm, [event.target.name]: event.target.value })
  }

  return (
    <div className={styles.Container}>
      <Form className={styles.DatePicker}>
        <Row className='mb-3'>
          <Form.Group as={Col} className='mb-3' controlId='Form.StartDate'>
            <Form.Label className={styles.Label}>Start Date</Form.Label>
            <Form.Control
              type='date'
              name='startDate'
              placeholder='Start Date'
              defaultValue={dateForm.startDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} className='mb-3' controlId='Form.EndDate'>
            <Form.Label className={styles.Label}>End Date</Form.Label>
            <Form.Control
              type='date'
              name='endDate'
              placeholder='End Date'
              defaultValue={dateForm.endDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  )
}

export default DatePicker
