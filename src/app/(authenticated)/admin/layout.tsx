'use client'

import { ILayoutProps } from '@/shared/types'
import { useRoleGuard } from '@/shared/hooks/useRoleGuard'

const Layout: React.FC<ILayoutProps> = ({ children }) => {

  useRoleGuard('Admin')

  return (
    <>
      { children }
    </>
  )
}

export default Layout
