import { Metadata } from 'next'
import CoachesPage from '@/features/coaches/pages/list'

export const metadata: Metadata = {
  title:
    "Trainers | COA-CH",
  description: "This is Trainers for COA-CH",
}

const Trainers: React.FC = async (props: {
  searchParams?: Promise<{
    query?: string
    page?: string
    specialization?: string
    listed?: string
  }>
}) => {
  const searchParams = await props.searchParams

  const query = searchParams?.query || ''
  const specialization = searchParams?.specialization || 'All'
  const currentPage = Number(searchParams?.page) || 1
  const listed = searchParams?.listed || 'All'

  return (
    <CoachesPage
      query={query}
      currentPage={currentPage}
      specialization={specialization}
      listed={listed}
    />
  )
}

export default Trainers
