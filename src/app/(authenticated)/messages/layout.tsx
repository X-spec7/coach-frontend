import { ILayoutProps } from '@/shared/types'
import SharedLayout from '@/shared/Layouts/SharedLayout'
import { ChatUsersContextProvider, ChatProvider } from '@/features/messages/providers'

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <SharedLayout
      headerTitle='Messages'
      headerDescription='Welcome and Let&apos;s do some workout today!'
    >
      <ChatUsersContextProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </ChatUsersContextProvider>
    </SharedLayout>
  )
}

export default Layout
