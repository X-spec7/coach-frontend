import { Metadata } from 'next'
import TrainersPage from '@/features/trainers/pages/list'
import { Suspense } from 'react'
import { Loader } from '@/shared/components'

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
  }>;
}) => {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const specialization = searchParams?.specialization || ''
  const currentPage = Number(searchParams?.page) || 1

  return (
    <Suspense fallback={<Loader />}>
      <TrainersPage
        query={query}
        currentPage={currentPage}
        specialization={specialization}
      />
    </Suspense>
  )
}

export default Trainers
