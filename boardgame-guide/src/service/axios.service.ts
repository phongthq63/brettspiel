import axios, {AxiosInstance, type AxiosRequestConfig} from 'axios'
import {IRequestConfig} from "@/service/game.service";

axios.defaults.headers.post['Content-Type'] = 'application/json'


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

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
    const configs: IRequestConfig = {
        ...options,
        method,
        url
    };
    configs.headers = {
        ...options.headers,
        'Content-Type': contentType
    };
    return configs;
}

export default axios