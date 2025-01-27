'use client'

import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.min.css'

import '../shared/css/style.css'
import '../shared/css/satoshi.css'

import { ILayoutProps } from '@/shared/types'
import { AuthProvider } from '@/shared/provider'

const RootLayout: React.FC<ILayoutProps> = ({ children }) => {

  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
