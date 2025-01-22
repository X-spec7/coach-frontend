'use client'

import { Header, Footer } from '../../../shared/Layouts'
import RightSideBar from './RightSideBar'
import DashboardContent from './DashboardContent'
import { useAuth } from '@/shared/provider'

const Dashboard = () => {
  const { user, login } = useAuth()
  
  return (
    <div className="flex justify-between gap-4 p-4 h-full">
      <div className='flex flex-col flex-1'>
        {/* user assertion is safe because it is checked in the layout */}
        <Header
          isDashboard
          title={`Hello, ${user!.firstName} ${user!.lastName}!  👋`}
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
