'use client'

import React, { createContext, useContext, useState } from 'react'

interface GlobalAppState {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpenStatus: (isOpen: boolean) => void
}

const defaultGlobalAppState: GlobalAppState = {
  isSidebarOpen: false,
  toggleSidebar: () => {},
  setSidebarOpenStatus: () => {},
}

const GlobalAppContext = createContext<GlobalAppState>(defaultGlobalAppState)

export const GlobalAppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState)
  }

  const setSidebarOpenStatus = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen)
  }

  return (
    <GlobalAppContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        setSidebarOpenStatus,
      }}
    >
      {children}
    </GlobalAppContext.Provider>
  )
}

export const useGlobalAppState = () => {
  const context = useContext(GlobalAppContext)
  if (!context) {
    throw new Error('useGlobalApp must be used within a GlobalAppProvider')
  }
  return context
}
