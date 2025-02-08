import SharedLayout from '@/shared/Layouts/SharedLayout'
import { ILayoutProps } from '@/shared/types'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <SharedLayout
      headerTitle='Exercises Page'
      headerDescription='Check the list of exercises, or create new one.'
    >
      {children}
    </SharedLayout>
  )
}

export default Layout
