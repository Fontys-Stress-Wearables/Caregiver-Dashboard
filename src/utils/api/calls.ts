import { useMsal } from '@azure/msal-react'
import { API_URL, AUTH_REQUEST_SCOPE_URL } from '../environment'

interface ApiCalls {
  token?: string
  apiUrl?: string
  path: string
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  body?: string | PatientProps | OrganizationProps | PatientGroupProps | FeedbackProps
}

interface BaseApiResponse {
  error: boolean
  errorCode?: string | null
  errorMessage?: string
}

export type PatientProps = {
  id?: string
  firstName: string
  lastName: string
  birthdate: string
  isActive?: boolean
}

export type CaregiverProps = {
  id: string
  firstName: string
  lastName: string
  emailAddress: number
  isActive: boolean
  isGuest: boolean
  role: string
  patientGroups: PatientGroupProps[]
  azureId: string
}

export type PatientGroupProps = {
  id?: string
  groupName: string
  description: string
  caregivers?: CaregiverProps[]
  patients?: PatientProps[]
}

export type OrganizationProps = {
  id: string
  name: string
}

export type FeedbackProps = {
  id: string
  patientId: string
  authorId: string
  stressMeasurementId: string
  comment: string
  createdCommentDate: string
  createdStressMeasurementDate: string
}

interface PatientsPropsResponse extends BaseApiResponse {
  response: PatientProps[]
}

interface PatientPropsResponse extends BaseApiResponse {
  response: PatientProps
}

interface PatientGroupsPropsResponse extends BaseApiResponse {
  response: PatientGroupProps[]
}

interface FeedbackPropsResponse extends BaseApiResponse {
  response: FeedbackProps[]
}

interface FeedbackEditPropsResponse extends BaseApiResponse {
  response: FeedbackProps
}

export const useAuthRequest = () => {
  const { accounts } = useMsal()

  return {
    scopes: [AUTH_REQUEST_SCOPE_URL, 'User.Read'],
    account: accounts[0],
  }
}

const callApi = async ({ token, apiUrl, path, method, body }: ApiCalls) => {
  const url = `${apiUrl || API_URL}/${path}`

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  if (body) fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body)

  const response = await fetch(url, fetchOptions)
  if (!response.ok) {
    return {
      response: `${response.status}|${response.statusText}`,
      error: true,
    }
  }

  const responseText = await response.text()
  return {
    response: responseText && responseText.length > 0 ? JSON.parse(responseText) : {},
    error: false,
  }
}

export const getPatient = (accessToken: string, patientId: string): Promise<PatientPropsResponse> =>
  callApi({
    token: accessToken,
    path: `patients/${patientId}`,
    method: 'GET',
  })

export const getPatientsForPatientGroup = (
  accessToken: string,
  patientGroupId: string,
): Promise<PatientsPropsResponse> =>
  callApi({
    token: accessToken,
    path: `patient-groups/${patientGroupId}/patients`,
    method: 'GET',
  })

export const getPatientGroupsForCaregiver = (
  accessToken: string,
  caregiverId: string,
): Promise<PatientGroupsPropsResponse> =>
  callApi({
    token: accessToken,
    path: `patient-groups/caregivers/${caregiverId}`,
    method: 'GET',
  })

export const updatePatient = (
  accessToken: string,
  patient: PatientProps,
): Promise<PatientPropsResponse> =>
  callApi({
    token: accessToken,
    path: `patients/${patient.id}`,
    method: 'PUT',
    body: patient,
  })

export const getFeedbackByPatientId = (
  accessToken: string,
  patientId: string,
): Promise<FeedbackPropsResponse> =>
  callApi({
    token: accessToken,
    path: `feedback/patient/${patientId}`,
    method: 'GET',
  })

export const editFeedbackById = (
  accessToken: string,
  feedback: FeedbackProps,
): Promise<FeedbackEditPropsResponse> =>
  callApi({
    token: accessToken,
    path: `feedback/${feedback.id}`,
    method: 'PUT',
    body: feedback,
  })
