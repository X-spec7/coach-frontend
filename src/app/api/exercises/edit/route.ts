import axios from "axios"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { REST_API_BASE_URL } from "@/shared/constants"
import { handleApiError } from "../../auth-util"

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

export async function POST(request: Request) {
  try {
    const body = request.json()

    const response = await apiClient.post(
      '/exercises/update/',
      body
    )

    return NextResponse.json(
      request,
      { status: response.status }
    )
  } catch (error) {
    handleApiError(error, request)
  }
}
