import axios, {AxiosInstance, type AxiosRequestConfig} from 'axios'
import {getItem} from "@/hook/useCookie";
import {wait} from "@/utils";


axios.defaults.headers.post['Content-Type'] = 'application/json'

export const instance = axios.create({
    baseURL: "http://localhost:8083",
    timeout: 100000,
    withCredentials: false
})

instance.interceptors.request.use(
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

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const requestConfig = error.config
        if (error.response && error.response.status === 401 && !requestConfig._retry) {
            requestConfig._retry = true

            await wait(1000)

            return instance(requestConfig)

            // location.replace('/login')
            // return axios
            //   .post('/auth/refresh-token', {
            //     refreshToken: getRefeshToken()
            //   })
            //   .then((res) => {
            //     // console.log('res', res.status, res.data);
            //     if (res.status === 201 || res.status === 200) {
            //       // 1) put token to LocalStorage
            //       const { token } = res.data
            //       setAccessToken(token)

            //       // 2) Change Authorization header
            //       axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

            //       // 3) return originalRequest object with Axios.
            //       return axios(originalRequest)
            //     }
            //     throw new Error("Can't refesh token.")
            //   })
            //   .catch((err) => {
            //     clearAuth()
            //     location.replace('/login')
            //     console.error('err', err)
            //   })
        } else {
            return Promise.reject(error)
        }
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

// Add default options
export const serviceOptions: ServiceOptions = {
    axios: instance
};

export default axios