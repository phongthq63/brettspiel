import axios from "axios";
import {socketApiUrl} from "../../../config";
import {getItem} from "@/hooks/cookie/useCookie";

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