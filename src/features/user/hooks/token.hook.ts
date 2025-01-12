import useLocalStorage from '@/shared/hooks/useLocalStorage'

const useToken = () => {
  const [token, setToken] = useLocalStorage<string | null>('access_token', null)

  const getLocalAccessToken = () => token

  const updateLocalAccessToken = (token: string) => {
    setToken(token)
  }

  const removeToken = () => {
    setToken(null)
  }

  return {
    getLocalAccessToken,
    updateLocalAccessToken,
    removeToken,
  }
}

export default useToken
