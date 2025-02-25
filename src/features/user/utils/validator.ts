import { LoginPayloadDTO } from '../types'

export const validateLoginPayload = (loginPayload: LoginPayloadDTO): boolean => {
  if (loginPayload.email.trim() !== '' && loginPayload.password.trim() !== '') {
    return true
  }

  return false
}
