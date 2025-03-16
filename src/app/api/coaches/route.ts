import axios from 'axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { REST_API_BASE_URL } from '@/shared/constants'

// Create an Axios instance for server-side API calls
const apiClient = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Middleware to attach the auth token
const attachAuthToken = () => {
  const token = cookies().get('access_token')?.value
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// GET Coaches
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const response = await apiClient.get(`/users/coaches/get/?${searchParams.toString()}`, {
      headers: attachAuthToken()
    })
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 })
  }
}

// POST (e.g., Toggle coach listed state)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await apiClient.post('/users/coach/toggle/listed/', body, {
      headers: attachAuthToken()
    })
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 })
  }
}
