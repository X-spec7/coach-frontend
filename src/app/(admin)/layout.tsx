'use client'

import { DefaultLayout } from '@/shared/Layouts'
import { ILayoutProps } from '@/shared/types'
import { AuthenticatedAppProvider } from '@/shared/provider'
import { useRoleGuard } from '@/shared/hooks/useRoleGuard'

const Layout: React.FC<ILayoutProps> = ({ children }) => {

  useRoleGuard('Admin')

  return (
    <AuthenticatedAppProvider>
      <DefaultLayout>
        {children}
      </DefaultLayout>
    </AuthenticatedAppProvider>
  )
}

export default Layout
