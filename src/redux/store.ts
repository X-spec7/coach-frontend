
import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { authSlice } from '@/features/user/slice/userSlice'
import { globalAppSlice } from './globalAppSlice'

const rootReducer = combineSlices(authSlice, globalAppSlice)

export type RootState = ReturnType<typeof rootReducer>

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat()
    },
  })
}

export type AppStore = ReturnType<typeof createStore>

export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action<string>
>
