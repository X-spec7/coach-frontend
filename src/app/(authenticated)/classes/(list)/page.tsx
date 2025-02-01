import { Metadata } from 'next'

import ClassesList from '@/features/classes/pages/list'

export const metadata: Metadata = {
  title:
    "Classes | COA-CH",
  description: "This is Classes for COA-CH",
};

const Classes: React.FC = () => {
  return (
    <>
      <ClassesList />
    </>
  )
}

export default Classes
