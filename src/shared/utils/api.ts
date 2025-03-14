import { cookies } from "next/headers"

export const attachAuthToken = () => {
  const token = cookies().get('access_token')?.value
  return token ? { Authorization: `Bearer ${token}` } : {}
}
