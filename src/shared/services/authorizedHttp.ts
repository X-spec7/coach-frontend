import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const authorizedHttpServer = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
})

authorizedHttpServer.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

authorizedHttpServer.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Session expired. Redirecting to login.');
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default authorizedHttpServer

dotenv.config()
