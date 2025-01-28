'use client'

import { Header, Footer } from '@/shared/Layouts'
import CoachProfileContent from './content/CoachProfileContent'
import ClientProfileContent from './content/ClientProfileContent'
import { useAuth } from '@/shared/provider'

const UpdateProfilePage = () => {
  const { user } = useAuth()
  
  // User assertion works fine cause it is checked in the layout
  return (
    <div className='flex flex-col items-center gap-4 w-full h-full p-4'>
      <Header
        title={`Hello, ${user!.firstName} ${user!.lastName}!  👋`}
        description='Let’s complete your wonderful today!'
      />

      {
        user?.userType === 'Coach' ? (
          <CoachProfileContent />
        ) : (
          <ClientProfileContent />
        )
      }

      <Footer />
    </div>
  )
}

export default UpdateProfilePage
