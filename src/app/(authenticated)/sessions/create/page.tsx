import { Metadata } from 'next'
import CreateSessionContent from '@/features/sessions/pages/session-create'

export const metadata: Metadata = {
  title:
    "Create Session | COA-CH",
  description: "This is Session Creation Page for COA-CH",
}

const page = () => {
  return (
    <>
      <CreateSessionContent />
    </>
  )
}

export default page
