import axios from "axios";
import {splendorApiUrl} from "../../../../../config";
import {getItem} from "@/hooks/useCookie";

export const instanceSplendor = axios.create({
    baseURL: splendorApiUrl,
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