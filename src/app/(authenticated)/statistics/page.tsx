import { Metadata } from 'next'

import StatisticsPage from '@/features/statistics/pages'

export const metadata: Metadata = {
  title:
    "Statistics | COA-CH",
  description: "This is Statistics for COA-CH",
}

const Statistics: React.FC = () => {
  return (
    <>
      <StatisticsPage />
    </>
  )
}

export default Statistics
