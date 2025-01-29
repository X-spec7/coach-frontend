'use client'

import { Header, Footer } from '@/shared/Layouts'
import CoachProfileUpdateForm from './content/CoachProfileUpdateForm'
import ClientProfileUpdateForm from './content/ClientProfileUpdateForm'
import { useAuth } from '@/shared/provider'

const UpdateProfilePage = () => {
  const { user } = useAuth()
  
  // NOTE: User assertion is safe cause it is checked in the layout
  return (
    <div className='flex flex-col items-center gap-4 w-full h-full p-4'>
      <Header
        title={`Hello, ${user!.firstName} ${user!.lastName}!  👋`}
        description='Let’s complete your wonderful today!'
      />

      {
        user?.userType === 'Coach' ? (
          <CoachProfileUpdateForm />
        ) : (
          <ClientProfileUpdateForm />
        )
      }

      <Footer />
    </div>
  )
}

export default UpdateProfilePage
