import axios from 'axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { REST_API_BASE_URL } from '@/shared/constants'

export const authorizedHttpServerSideClient = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to attach the auth token automatically
authorizedHttpServerSideClient.interceptors.request.use((config) => {
  const token = cookies().get('access_token')?.value

  if (token) {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (error) => Promise.reject(error))

// Response interceptor for error handling and redirecting
authorizedHttpServerSideClient.interceptors.response.use(
  (response) => response, // Simply return response
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to sign-in page on 401 error
      return NextResponse.redirect('/signin')
    }

    console.error('HTTP Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default authorizedHttpServerSideClient
