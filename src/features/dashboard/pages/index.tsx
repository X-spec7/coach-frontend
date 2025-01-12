'use client'

import { selectUser } from '@/features/user/slice/userSlice'

import { Header, Footer } from '../../../shared/Layouts'
import RightSideBar from './RightSideBar'
import DashboardContent from './DashboardContent'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(selectUser)
  
  return (
    <div className="flex justify-between gap-4 p-4 h-full">
      <div className='flex flex-col flex-1'>
        <Header
          isDashboard
          title={`Hello, ${user.firstName} ${user.lastName}!  👋`}
          description='Welcome and Let’s do some workout today!'
        />

        <DashboardContent />
        
        <Footer />
      </div>
      <div className='max-2xl:hidden'>
        <RightSideBar />
      </div>
    </div>
  )
}

export default Dashboard
