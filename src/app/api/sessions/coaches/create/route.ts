import { authorizedHttpServerSideClient } from '@/shared/services'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await authorizedHttpServerSideClient.post(
      '/session/create/',
      body
    )

    return NextResponse.json(
      response.data,
      { status: response.status }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 })
  }
}
