import { createAppSlice } from '@/redux/createAppSlice'
import { PayloadAction } from '@reduxjs/toolkit'

export interface GlobalAppState {
  isSidebarOpen: boolean
  // Add more fields as needed
}

const initialGlobalAppState: GlobalAppState = {
  isSidebarOpen: false
}

export const globalAppSlice = createAppSlice({
  name: 'globalApp',
  initialState: initialGlobalAppState,
  reducers: (create) => ({
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload
    }
  }),
  selectors: {
    selectIsSidebarOpen: (globalApp) => globalApp.isSidebarOpen
  }
})

// Export the actions
export const { toggleSidebar, setSidebarOpen } = globalAppSlice.actions

// Export the selectors
export const { selectIsSidebarOpen } = globalAppSlice.selectors
