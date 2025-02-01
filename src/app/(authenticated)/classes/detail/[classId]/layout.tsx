import { ILayoutProps } from '@/shared/types'
import SharedLayout from '@/shared/Layouts/SharedLayout'

const Layout: React.FC<ILayoutProps> = ({ children }) => {

  return (
    <SharedLayout
      headerTitle='Class Details'
      headerDescription='Back to Class List'
      isDetailPage
    >
      {children}
    </SharedLayout>
  )
}

export default Layout
