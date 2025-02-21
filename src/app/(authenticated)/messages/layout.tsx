import { ILayoutProps } from '@/shared/types'
import SharedLayout from '@/shared/Layouts/SharedLayout'
import { MessagesContextProvider } from '@/features/messages/providers/messages.provider'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <SharedLayout
      headerTitle='Messages'
      headerDescription='Welcome and Let&apos;s do some workout today!'
    >
      <MessagesContextProvider>
        {children}
      </MessagesContextProvider>
    </SharedLayout>
  )
}

export default Layout
