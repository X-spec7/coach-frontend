import axios from 'axios'
import { REST_API_BASE_URL } from '../provider/env.provider'

const authorizedHttpServer = axios.create({
    baseURL: REST_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

authorizedHttpServer.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${token}`
        }
        
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

authorizedHttpServer.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Session expired. Redirecting to login.')
            window.location.href = '/signin'
        }
        return Promise.reject(error)
    }
)

export default authorizedHttpServer
