import SharedLayout from '@/shared/Layouts/SharedLayout'
import { ILayoutProps } from '@/shared/types'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <SharedLayout
      headerTitle='Trainers'
      headerDescription='Meet Your Fitness Experts'
    >
      {children}
    </SharedLayout>
  )
}

export default Layout
