import {getConfigs, IRequestOptions, ServiceOptions} from "@/service/axios.service";
import {instanceGateway} from "@/service/server/axios/gateway";


export const basePath = '';

export interface IRequestConfig {
    method?: any;
    headers?: any;
    url?: any;
    data?: any;
    params?: any;
}

// Add default options
export const serviceOptions: ServiceOptions = {
    axios: instanceGateway
};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
    if (serviceOptions.axios) {
        return serviceOptions.axios
            .request(configs)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    } else {
        throw new Error('please inject yourself instance like axios  ');
    }
}



export class RegisterService {
    /**
     *
     */
    static register(
        params: {
            /**  */
            body?: RegisterRequest;
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<RObject> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/register';

            const configs: IRequestConfig = getConfigs('post', 'application/x-www-form-urlencoded', url, options);

            configs.data = params.body;

            axios(configs, resolve, reject);
        });
    }
}

export class LoginService {
    /**
     *
     */
    static loginByUsernamePassword(
        params: {
            /**  */
            body: LoginRequest;
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<RLoginResponse> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/login';

            const configs: IRequestConfig = getConfigs('post', 'application/x-www-form-urlencoded', url, options);
            configs.data = params.body;

            axios(configs, resolve, reject);
        });
    }
    /**
     *
     */
    static refresh(
        params: {
            /** requestBody */
            body?: RefreshRequest;
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<RObject> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/login/refresh';

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

            axios(configs, resolve, reject);
        });
    }
}

export class LogoutService {
    /**
     *
     */
    static logout(options: IRequestOptions = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/logout';

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

            axios(configs, resolve, reject);
        });
    }
}



export interface RegisterRequest {
    /** Nhập email */
    email?: string;

    /** Nhập password */
    password?: string;

    /** Xác nhận password */
    confirm_password?: string;
}

export interface RObject {
    /**  */
    code?: number;

    /**  */
    msg?: string;

    /**  */
    data?: object;

    /**  */
    ts?: string;
}

export interface LoginRequest {
    /** Tên đăng nhập */
    username?: string;

    /** Mật khẩu */
    password?: string;
}

export interface LoginResponse {
    /** Token */
    access_token?: string;

    /** Loại token */
    token_type?: string;

    /** Thời gian hết hạn (s) */
    expires_in?: number;

    /** Token */
    refresh_token?: string;
}

export interface RLoginResponse {
    /**  */
    code?: number;

    /**  */
    msg?: string;

    /**  */
    data?: LoginResponse;

    /**  */
    ts?: string;
}

export interface RefreshRequest {
    /** Refresh token */
    refresh_token?: string;
}