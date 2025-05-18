"use server"

import axios from "axios";
import {gatewayApiUrl} from "../../../../config";
import {cookies} from "next/headers";

export const instanceGateway = axios.create({
    baseURL: gatewayApiUrl,
    timeout: 100000,
    withCredentials: false
})

instanceGateway.interceptors.request.use(
    async (config) => {
        const customHeaders: Record<string, string> = {}
        const cookieStore = await cookies()
        const token = cookieStore.get('access-token')?.value
        if (token && config.headers?.Authorization !== 'no-auth') {
            customHeaders['Authorization'] = `Bearer ${token}`
        }

        config.headers = Object.assign(config.headers, customHeaders)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

instanceGateway.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error)
    }
)