'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { DefaultLayout } from '@/shared/Layouts'
import { ILayoutProps } from '@/shared/types'
import { useAuth } from '@/shared/provider'
import { Loader } from '@/shared/components'
import { profileService } from '@/features/user/services'
import { AuthenticatedAppProvider } from '@/shared/provider'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const router = useRouter()

  const { user, login } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/signin')
    }

  }, [router])

  if (!user) {
    profileService.getProfile()
      .then((res) => {
        if (res.status === 200) {
          login(res.user)
        } else {
          // TODO: update exception handling
          alert('Something went wrong')
        }
      })
    return <Loader />
  }

  return (
    <AuthenticatedAppProvider>
      <DefaultLayout>
        {children}
      </DefaultLayout>
    </AuthenticatedAppProvider>
  )
}

export default Layout
