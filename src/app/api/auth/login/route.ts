import axios from 'axios'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { REST_API_BASE_URL } from '@/shared/constants'

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    // Send request to actual backend
    const response = await axios.post(`${REST_API_BASE_URL}/authentication/login/`, payload)

    const { token } = response.data
    if (!token) {
      return NextResponse.json({ error: 'Invalid response from server' }, { status: 500 })
    }

    // Store token in HTTP-only cookie
    cookies().set({
      name: 'access_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })

    return NextResponse.json({
      success: true,
      status: response.status,
      ...response.data })
      
  } catch (error: any) {
    return NextResponse.json({error: error.response?.data || 'Login failed' }, { status: error.response?.status || 500 })
  }
}
