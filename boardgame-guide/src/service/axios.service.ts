import axios, {AxiosInstance, type AxiosRequestConfig} from 'axios'
import {getItem} from "@/hook/useCookie";
import {apiUrl, socketApiUrl} from "../../config";


axios.defaults.headers.post['Content-Type'] = 'application/json'

export const instanceSplendor = axios.create({
    baseURL: apiUrl,
    timeout: 100000,
    withCredentials: false
})

instanceSplendor.interceptors.request.use(
    (config) => {
        const customHeaders: Record<string, string> = {}
        const token = getItem('access-token')
        if (token && config.headers?.Authorization !== 'no-auth') {
            customHeaders['Authorization'] = `Bearer ${token}`
        }

        config.headers = Object.assign(config.headers, customHeaders)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

instanceSplendor.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error)
    }
)

export const instanceSocket = axios.create({
    baseURL: socketApiUrl,
    timeout: 100000,
    withCredentials: false
})

instanceSocket.interceptors.request.use(
    (config) => {
        const customHeaders: Record<string, string> = {}
        const token = getItem('access-token')
        if (token && config.headers?.Authorization !== 'no-auth') {
            customHeaders['Authorization'] = `Bearer ${token}`
        }

        config.headers = Object.assign(config.headers, customHeaders)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

instanceSocket.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error)
    }
)


export interface IRequestOptions extends AxiosRequestConfig {
    /**
     * show loading status
     */
    loading?: boolean;
    /**
     * display error message
     */
    showError?: boolean;
    /**
     * data security, extended fields are encrypted using the specified algorithm
     */
    security?: Record<string, 'md5' | 'sha1' | 'aes' | 'des'>;
    /**
     * indicates whether Authorization credentials are required for the request
     * @default true
     */
    withAuthorization?: boolean;
}

// Add options interface
export interface ServiceOptions {
    axios?: AxiosInstance;
}

export default axios