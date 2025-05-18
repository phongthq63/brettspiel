import axios from "axios";
import {apiUrl} from "../../../../config";

export const instanceGameServer = axios.create({
    baseURL: apiUrl,
    timeout: 100000,
    withCredentials: false
})

instanceGameServer.interceptors.request.use(
    (config) => {
        const customHeaders: Record<string, string> = {}
        config.headers = Object.assign(config.headers, customHeaders)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

instanceGameServer.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error)
    }
)