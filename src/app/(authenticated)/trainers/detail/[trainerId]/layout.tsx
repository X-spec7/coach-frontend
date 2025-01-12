import { ILayoutProps } from '@/shared/types/common.type'
import SharedLayout from '@/shared/Layouts/SharedLayout'

const Layout: React.FC<ILayoutProps> = ({ children }) => {

  return (
    <SharedLayout
      headerTitle='TrainerDetail'
      headerDescription='Back To Trainer List'
      isDetailPage
    >
      {children}
    </SharedLayout>
  )
}

export default Layout
