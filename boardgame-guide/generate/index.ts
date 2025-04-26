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

export class FeedbackService {
  /**
   *
   */
  static sendFeedback(
    params: {
      /** requestBody */
      body?: SendFeedbackRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/feedback';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class ContactService {
  /**
   *
   */
  static sendContact(
    params: {
      /** requestBody */
      body?: SendContactRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/contact';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class WelcomeService {
  /**
   *
   */
  static getStatistics(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/welcome/statistics';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getListFeatureGame(
    params: {
      /** Sắp xếp theo */
      softBy?: string;
      /** Số lượng */
      size?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/welcome/feature/game';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { soft_by: params['softBy'], size: params['size'] };

      axios(configs, resolve, reject);
    });
  }
}

export class TestService {
  /**
   *
   */
  static test(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/test';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static token(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/test/token';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export interface SendFeedbackRequest {
  /** Tên người chơi */
  name?: string;

  /** Email */
  email?: string;

  /** Tiêu đề */
  subject?: string;

  /** Nội dung */
  message?: string;
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

export interface SendContactRequest {
  /** Tên người chơi */
  name?: string;

  /** Email */
  email?: string;

  /** Tiêu đề */
  subject?: string;

  /** Nội dung */
  message?: string;
}

export interface GetStatisticsWelcomeResponse {
  /**  */
  visit_count?: string;

  /**  */
  current_playing_player_count?: string;

  /**  */
  current_playing_game_count?: string;

  /**  */
  game_count?: number;
}

export interface RGetStatisticsWelcomeResponse {
  /**  */
  code?: number;

  /**  */
  msg?: string;

  /**  */
  data?: GetStatisticsWelcomeResponse;

  /**  */
  ts?: string;
}

export interface FeaturedGameDTO {
  /** ID của game */
  id?: string;

  /** Tiêu đề game */
  title?: string;

  /** Mô tả game */
  description?: string;

  /** Đường dẫn ảnh đại diện game */
  image_url?: string;

  /** Thời gian chơi tối thiểu */
  min_play_time?: number;

  /** Thời gian chơi tối đa */
  max_play_time?: number;

  /** Số người chơi tối thiểu */
  min_players?: number;

  /** Số người chơi tối đa */
  max_players?: number;

  /** Độ phổ biến của game */
  popular?: number;

  /** Game hot */
  hot?: number;

  /** Game được đánh giá cao */
  top_rated?: number;
}

export interface RListFeaturedGameDTO {
  /**  */
  code?: number;

  /**  */
  msg?: string;

  /**  */
  data?: FeaturedGameDTO[];

  /**  */
  ts?: string;
}
