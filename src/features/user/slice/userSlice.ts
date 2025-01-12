import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { createAppSlice } from '@/redux/createAppSlice'
import { AxiosError } from 'axios'

import { UserResponseDTO, LoginPayloadDTO, RegisterPayloadDTO, User, ProfilePayloadDTO } from '../types'
import { convertJsonUserToObject } from '../utils'
import { authService, tokenService, profileService } from '../services'

export interface AuthSliceState {
  isAuthenticated: boolean
  user: User
}

const initialUser: User = {
  firstName: '',
  lastName: '',
  userType: '',
  email: '',
}
const accessToken = tokenService.getLocalAccessToken()

const initialState: AuthSliceState = {
  isAuthenticated: accessToken ? true : false,
  user: initialUser,
}

export const registerAsync = createAsyncThunk<AuthSliceState, RegisterPayloadDTO>(
  'authentication/register',
  async (registerPayload: RegisterPayloadDTO, thunkApi) => {
    try {
      const response = await authService.register(registerPayload)
      if (response.status === 200) {
        return response
      }
    } catch (_error) {
      const error = _error as Error | AxiosError
      console.log(error)
      thunkApi.rejectWithValue(error.message)
    }
  }
)

export const loginAsync = createAsyncThunk<UserResponseDTO, LoginPayloadDTO>(
  'authentication/login',
  async (loginPayload: LoginPayloadDTO, thunkApi) => {
    try {
      const response = await authService.login(loginPayload)
      if (response.status === 200) {
        return response.data.result.user
      }
    } catch (_error) {
      const error = _error as Error | AxiosError
      console.log(error)
      thunkApi.rejectWithValue(error.message)
    }
  }
)

export const updateProfileAsync = createAsyncThunk<UserResponseDTO, ProfilePayloadDTO>(
  'authentication/profile/update',
  async (profileUpdatePayload: ProfilePayloadDTO, thunkApi) => {
    try {
      const response = await profileService.updateProfile(profileUpdatePayload)
      if (response.status === 200) {
        return response.data.result.user
      }
    } catch (_error) {
      const error = _error as Error | AxiosError
      console.log(error)
      thunkApi.rejectWithValue(error.message)
    }
  }
)

export const getProfileAsync = createAsyncThunk<UserResponseDTO>(
  'authentication/profile/get',
  async (_, thunkApi) => {
    try {
      const response = await profileService.getProfile()
      if (response.status === 200) {
        return response.data.user
      }
    } catch (_error) {
      const error = _error as Error | AxiosError
      console.log(error)
      thunkApi.rejectWithValue(error.message)
    }
  }
)

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  authService.logout()
})

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: (create) => ({
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }),
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.isAuthenticated = true
        state.user = convertJsonUserToObject(payload)
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isAuthenticated = false
      })
      .addCase(updateProfileAsync.fulfilled, (state, { payload }) => {
        state.user = convertJsonUserToObject(payload)
      })
      .addCase(getProfileAsync.fulfilled, (state, { payload }) => {
        state.user = convertJsonUserToObject(payload)
      })
  },
  selectors: {
    selectIsAuthenticated: (auth) => auth.isAuthenticated,
    selectUser: (auth) => auth.user,
  }
})

export const { selectUser } = authSlice.selectors
