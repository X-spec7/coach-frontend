'use client'

import { useReducer, useMemo, createContext, useContext, useEffect, useCallback } from 'react'
import { ILayoutProps, IUser } from '../types'
import useLocalStorage from '../hooks/useLocalStorage'
import { ICoachProfile } from '../types'

interface State {
  isAuthenticated: boolean
  user: IUser | ICoachProfile | null
}

type Action =
  | { type: 'LOGIN'; payload: IUser }
  | { type: 'LOGOUT' }

const initialState: State = {
  isAuthenticated: false,
  user: null,
}

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: action.payload }
    case 'LOGOUT':
      return { isAuthenticated: false, user: null }
    default:
      throw new Error('Unhandled action type')
  }
}

interface AuthContextType extends State {
  login: (user: IUser | ICoachProfile) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<ILayoutProps> = ({ children }) => {
  const [cachedUser, setCachedUser] = useLocalStorage<IUser | ICoachProfile | null>('coachCachedState', null)
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    if (cachedUser) {
      dispatch({type: 'LOGIN', payload: cachedUser})
    }
  }, [cachedUser])

  const login = useCallback((user: IUser | ICoachProfile) => {
    setCachedUser(user)
    dispatch({ type: 'LOGIN', payload: user }) 
  }, [setCachedUser])

  const logout = useCallback(() => {
    setCachedUser(null)
    dispatch({ type: 'LOGOUT' })
  }, [setCachedUser])

  const value = useMemo(() => ({ ...state, login, logout }), [state, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
