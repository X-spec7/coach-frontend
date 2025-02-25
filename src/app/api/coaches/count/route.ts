import { NextResponse } from 'next/server'
import axios from 'axios'
import { cookies } from 'next/headers'
import { REST_API_BASE_URL } from '@/shared/constants'

const apiClient = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

const attachAuthToken = () => {
  const token = cookies().get('access_token')?.value
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function GET() {
  try {
    const response = await apiClient.get('/users/coaches/get/count/', {
      headers: attachAuthToken()
    })
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 })
  }
}
