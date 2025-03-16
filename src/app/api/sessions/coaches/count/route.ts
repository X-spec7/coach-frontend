import { authorizedHttpServerSideClient } from '@/shared/services'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const response = await authorizedHttpServerSideClient.get(`/session/get/mine/count/?${searchParams.toString()}`)

    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 })
  }
}
