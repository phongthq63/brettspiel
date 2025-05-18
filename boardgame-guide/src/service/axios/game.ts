import axios from "axios";
import {apiUrl} from "../../../config";
import {getItem} from "@/hooks/cookie/useCookie";

export const instanceGame = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    withCredentials: true
})

instanceGame.interceptors.request.use(
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

instanceGame.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error)
    }
)