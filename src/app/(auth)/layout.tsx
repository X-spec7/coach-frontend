import React from 'react'

import { ILayoutProps } from '@/shared/types'

const Layout: React.FC<ILayoutProps> = ({children}) => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      {/* Background image with a blur layer */}
      <div className="absolute inset-0 bg-cover bg-center blur-md" style={{ backgroundImage: 'url("images/background/2.jpg")' }} />
      
      {/* Content container */}
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        {children}
      </div>
    </div>
  )
}

export default Layout
