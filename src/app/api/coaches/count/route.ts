import axios from 'axios'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { REST_API_BASE_URL } from '@/shared/constants'
import { handleApiError } from '../../auth-util'

const apiClient = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = cookies().get("access_token")?.value

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export async function GET(request: Request) {
  try {
    const response = await apiClient.get('/users/coaches/get/count/')
    return NextResponse.json(response.data, { status: response.status })

  } catch (error: any) {
    return handleApiError(error, request)
  }
}
