import SharedLayout from '@/shared/Layouts/SharedLayout'
import { ILayoutProps } from '@/shared/types'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <SharedLayout
      headerTitle='Classes'
      headerDescription='Enhance Your Skills with Expert-Led Classes'
    >
      {children}
    </SharedLayout>
  )
}

export default Layout
