class TokenService {
  getLocalAccessToken() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('access_token')
      return token
    }
  }
  setLocalAccessToken(token: string) {
    if (typeof window !== undefined) {
      localStorage.setItem('access_token', token)
    }
  }
  removeLocalAccessToken() {
    if (typeof window !== undefined) {
      localStorage.removeItem('access_token')
    }
  }
}

const tokenService = new TokenService()

export default tokenService
