import { useReducer, useMemo, createContext, useContext } from 'react'
import { ILayoutProps } from '../types'

interface State {
  isAuthenticated: boolean
  user: string | null
}

type Action =
  | { type: 'LOGIN'; payload: string }
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
  login: (user: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<ILayoutProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = (user: string) => dispatch({ type: 'LOGIN', payload: user })
  const logout = () => dispatch({ type: 'LOGOUT' })

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
