import { useMsal } from '@azure/msal-react'
import { API_URL, AUTH_REQUEST_SCOPE_URL } from '../environment'

interface ApiCalls {
  token?: string
  apiUrl?: string
  path: string
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  body?: string | PatientProps | OrganizationProps | PatientGroupProps
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
  birthdate: Date
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

interface OrganizationsPropsResponse extends BaseApiResponse {
  response: OrganizationProps[]
}

interface CaregiversPropsResponse extends BaseApiResponse {
  response: CaregiverProps[]
}

interface PatientsPropsResponse extends BaseApiResponse {
  response: PatientProps[]
}

interface PatientPropsResponse extends BaseApiResponse {
  response: PatientProps
}
interface PatientGroupPropsResponse extends BaseApiResponse {
  response: PatientGroupProps
}

interface PatientGroupsPropsResponse extends BaseApiResponse {
  response: PatientGroupProps[]
}

interface OrganizationPropsResponse extends BaseApiResponse {
  response: OrganizationProps
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
  if (body)
    fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body)

  try {
    const response = await fetch(url, fetchOptions)
    if (!response.ok) throw Error(`${response.status}|${response.statusText}`)
    const responseText = await response.text()
    return {
      error: false,
      response:
        responseText && responseText.length > 0 ? JSON.parse(responseText) : {},
    }
  } catch (e) {
    return {
      response: e,
      error: true,
    }
  }
}

export const getPatient = (
  accessToken: string,
  patientId: string,
): Promise<PatientPropsResponse> =>
  callApi({
    token: accessToken,
    path: `patients/${patientId}`,
    method: 'GET',
  })

// original endpoint
export const getPatientsForPatientGroup = (
  accessToken: string,
  patientGroupID: string,
): Promise<PatientsPropsResponse> =>
  callApi({
    token: accessToken,
    path: `patient-groups/${patientGroupID}/patients`,
    method: 'GET',
  })

// user service test endpoint
// export const getPatientsForPatientGroup = (
//   accessToken: string,
//   patientGroupID: string,
// ): Promise<PatientsPropsResponse> =>
//   callApi({
//     token: accessToken,
//     path: `patientgroups/${patientGroupID}/patients`,
//     method: 'GET',
//   })

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
