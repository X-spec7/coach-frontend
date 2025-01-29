import { Metadata } from 'next'
import { UpdateProfilePage } from '@/features/user/pages'


export const metadata: Metadata = {
  title:
    "Coach Profile | COA-CH",
  description: "This is coach profile page for COA-CH",
}

const Profile = () => {
  return (
    <>
      <UpdateProfilePage />
    </>
  )
}

export default Profile
