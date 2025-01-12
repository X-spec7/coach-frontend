'use client'

import { Header, Footer } from '@/shared/Layouts'
import CoachProfileContent from './content/CoachProfileContent'
import { useSelector } from 'react-redux'
import { selectUser } from '@/features/user/slice/userSlice'

const CoachProfilePage = () => {

  const user = useSelector(selectUser)
  
  return (
    <div className='flex flex-col items-center gap-4 w-full h-full p-4'>
      <Header
        title={`Hello, ${user.firstName} ${user.lastName}!  👋`}
        description='Let’s complete your wonderful today!'
      />

      <CoachProfileContent />

      <Footer />
    </div>
  )
}

export default CoachProfilePage
