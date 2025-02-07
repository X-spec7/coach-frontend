import { Metadata } from 'next'
import ExercisesPage from '@/features/exercises/pages'

export const metadata: Metadata = {
  title:
    "Exercises | COA-CH",
  description: "This is Exercises for COA-CH",
}

const Exercises: React.FC = async (props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) => {
  const searchParams = await props.searchParams

  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  return (
    <ExercisesPage
      query={query}
      currentPage={currentPage}
    />
  )
}

export default Exercises
