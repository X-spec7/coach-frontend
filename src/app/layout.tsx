'use client'

import { Provider } from 'react-redux'
import { createStore } from '@/redux/store'

import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.min.css'

import '../shared/css/style.css'
import '../shared/css/satoshi.css'

import { ILayoutProps } from '@/shared/types/common.type'

const RootLayout: React.FC<ILayoutProps> = ({ children }) => {
  const store = createStore()

  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <>
          <Provider store={store}>
            {children}
          </Provider>
        </>
      </body>
    </html>
  )
}

export default RootLayout
