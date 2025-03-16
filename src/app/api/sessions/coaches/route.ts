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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const response = await apiClient.get(`/session/get/mine/?${searchParams.toString()}`)

    return NextResponse.json(response.data, { status: response.status })
  } catch (error: any) {
    handleApiError(error, request)
  }
}
