import { Metadata } from 'next'
import { Dashboard } from '@/features'

export const metadata: Metadata = {
  title: 'Dashboard | COA-CH',
  description: 'This is Dashboard for COA-CH',
}

const Home: React.FC = () => {
  return (
    <>
      <Dashboard />
    </>
  )
}

export default Home
