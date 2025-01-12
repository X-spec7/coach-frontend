import { Metadata } from 'next'

import { SignInPage } from '@/features'

export const metadata: Metadata = {
  title: 'SignIn Page | COA-CH',
  description: 'This is SignIn Page for COA-CH',
}

const SignIn: React.FC = () => {
  return (
    <>
      <SignInPage />
    </>
  )
}

export default SignIn
