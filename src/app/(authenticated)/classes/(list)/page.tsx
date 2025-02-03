import { Metadata } from 'next'

import ClassesList from '@/features/classes/pages/list'

export const metadata: Metadata = {
  title:
    "Classes | COA-CH",
  description: "This is Classes for COA-CH",
};

const Classes: React.FC = async (props: {
  searchParams?: Promise<{
    query?: string
    page?: string
    category?: string
    level?: string
  }>
}) => {
  const searchParams = await props.searchParams

  const query = searchParams?.query
  const category = searchParams?.category
  const currentPage = Number(searchParams?.page) || 1
  const level = searchParams?.level

  return (
    <>
      <ClassesList
        query={query}
        category={category}
        currentPage={currentPage}
        level={level}
      />
    </>
  )
}

export default Classes
