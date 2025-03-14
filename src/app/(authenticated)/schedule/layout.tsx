import React from 'react'

import SharedLayout from '@/shared/Layouts/SharedLayout'
import { ILayoutProps } from '@/shared/types'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <SharedLayout
      headerTitle='Schedules'
      headerDescription='Control your schedule'
    >
      { children }
    </SharedLayout>
  )
}

export default Layout
