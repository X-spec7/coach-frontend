import { Metadata } from 'next'

import { SignUpPage } from '@/features'

export const metadata: Metadata = {
  title: 'SignIn Page | COA-CH',
  description: 'This is SignIn Page for COA-CH',
}

const SignUp: React.FC = () => {

  return (
    <SignUpPage />
  )
}

export default SignUp
