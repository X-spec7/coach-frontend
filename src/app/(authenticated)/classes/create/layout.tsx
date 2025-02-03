import SharedLayout from '@/shared/Layouts/SharedLayout'
import { ILayoutProps } from '@/shared/types'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <SharedLayout
      headerTitle='Create Class'
      headerDescription='Let’s create a class for your client!'
    >
      {children}
    </SharedLayout>
  )
}

export default Layout
