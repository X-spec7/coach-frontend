import axios from "axios"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { REST_API_BASE_URL } from "@/shared/constants"
import { handleApiError } from "../auth-util"

// Create an Axios instance for server-side API calls
const apiClient = axios.create({
  baseURL: REST_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor to automatically attach the auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const token = cookies().get("access_token")?.value

    // If token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// GET Coaches
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const response = await apiClient.get(`/users/coaches/get/?${searchParams.toString()}`)
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return handleApiError(error, request)
  }
}

// POST (e.g., Toggle coach listed state)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await apiClient.post("/users/coach/toggle/listed/", body)
    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    return handleApiError(error, request)
  }
}

