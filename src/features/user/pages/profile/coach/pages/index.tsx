'use client'

import { Header, Footer } from '@/shared/Layouts'
import CoachProfileContent from './content/CoachProfileContent'
import { useAuth } from '@/shared/provider'

const CoachProfilePage = () => {
  const { user } = useAuth()
  
  // User assertion works fine cause it is checked in the layout
  return (
    <div className='flex flex-col items-center gap-4 w-full h-full p-4'>
      <Header
        title={`Hello, ${user!.firstName} ${user!.lastName}!  👋`}
        description='Let’s complete your wonderful today!'
      />

      <CoachProfileContent />

      <Footer />
    </div>
  )
}

export default CoachProfilePage
