import { Metadata } from 'next';

import ClassesPage from '@/features/classes';

export const metadata: Metadata = {
  title:
    "Classes | COA-CH",
  description: "This is Classes for COA-CH",
};

const Classes: React.FC = () => {
  return (
    <>
      <ClassesPage />
    </>
  )
}

export default Classes
