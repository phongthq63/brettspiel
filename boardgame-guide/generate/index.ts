/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

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

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

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

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
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

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class RegisterService {
  /**
   *
   */
  static register(
    params: {
      /**  */
      request: RegisterRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/register';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { request: params['request'] };

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
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/login';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { body: params['body'] };

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
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/login/refresh';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

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
      let url = basePath + '/logout';

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
