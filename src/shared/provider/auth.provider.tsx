'use client'

import { useReducer, useMemo, createContext, useContext, useEffect } from 'react'
import { ILayoutProps, IUser } from '../types'
import useLocalStorage from '../hooks/useLocalStorage'

interface State {
  isAuthenticated: boolean
  user: IUser | null
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
  login: (user: IUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<ILayoutProps> = ({ children }) => {
  const [cachedUser, setCachedUser] = useLocalStorage<IUser | null>('coachCachedState', null)
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    if (cachedUser) {
      dispatch({type: 'LOGIN', payload: cachedUser})
    }
  })

  const login = (user: IUser) => {
    setCachedUser(user)
    dispatch({ type: 'LOGIN', payload: user }) 
  }
  const logout = () => {
    setCachedUser(null)
    dispatch({ type: 'LOGOUT' })
  }

  const value = useMemo(() => ({ ...state, login, logout }), [state])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
