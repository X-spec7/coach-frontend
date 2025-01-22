import { ILayoutProps } from '@/shared/types'
import SharedLayout from '@/shared/Layouts/SharedLayout'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <SharedLayout
      headerTitle='Messages'
      headerDescription='Welcome and Let&apos;s do some workout today!'
    >
      {children}
    </SharedLayout>
  )
}

export default Layout
