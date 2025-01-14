import SharedLayout from '@/shared/Layouts/SharedLayout'
import { ILayoutProps } from '@/shared/types/common.type'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <SharedLayout
      headerTitle='Create Session'
      headerDescription='Let’s complete your wonderful session!'
    >
      {children}
    </SharedLayout>
  )
}

export default Layout
