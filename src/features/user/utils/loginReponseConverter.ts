import { LoginResponseDTO, User } from '../types/auth.dto'

export function convertJsonUserToObject(loginResponse: LoginResponseDTO): User {
  return {
    id: loginResponse.id,
    firstName: loginResponse.first_name,
    lastName: loginResponse.last_name,
    userType: loginResponse.user_type,
    email: loginResponse.email,
    phoneNumber: loginResponse.phone_number,
    profilePicture: loginResponse.avatar_image_url,
    bannerImage: loginResponse.banner_image_url,
    yearsOfExperience: loginResponse.years_of_experience,
    specialization: loginResponse.specialization,
  }
}
