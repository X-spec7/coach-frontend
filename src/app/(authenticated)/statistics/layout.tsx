import SharedLayout from '@/shared/Layouts/SharedLayout'
import { ILayoutProps } from '@/shared/types'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <SharedLayout
      headerTitle='Statistics'
      headerDescription='Track Your Progress And Achievements'
    >
      {children}
    </SharedLayout>
  )
}

export default Layout
