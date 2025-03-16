import { NextResponse } from "next/server"

/**
 * Helper function to handle API errors with redirection for auth failures
 * @param error The error object from the API call
 * @param request The original request object
 * @param signInPath The path to redirect to for authentication (defaults to '/signin')
 */
export function handleApiError(error: any, request: Request, signInPath = "/signin") {
  // Check if it's an authentication error (401)
  if (error.response?.status === 401) {
    // Redirect to sign-in page
    return NextResponse.redirect(new URL(signInPath, request.url))
  }

  // For other errors, return a JSON response with the error
  return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 })
}

