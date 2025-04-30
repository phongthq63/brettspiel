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
   * Gửi phản hồi
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
   * Gửi thông tin liên hệ
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
   * Lấy thống kê
   */
  static getStatistics(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/welcome/statistics';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   * Lấy danh sách trò chơi nổi bật
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

export class HomeService {
  /**
   * Lấy danh sách banner
   */
  static getListBanner(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/home/banner';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class GameService {
  /**
   * Lấy danh sách trò chơi
   */
  static getListGame(
    params: {
      /** Từ khóa */
      keyword?: string;
      /** Số lượng người chơi (id) */
      players?: any | null[];
      /** Thời lượng chơi (id) */
      playTimes?: any | null[];
      /** Thể loại (id) */
      genres?: any | null[];
      /** Sắp xếp theo */
      softBy?: string;
      /** Trang */
      page?: number;
      /** Số lượng */
      size?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        keyword: params['keyword'],
        players: params['players'],
        play_times: params['playTimes'],
        genres: params['genres'],
        soft_by: params['softBy'],
        page: params['page'],
        size: params['size']
      };

      axios(configs, resolve, reject);
    });
  }
  /**
   * Lấy thông tin trò chơi
   */
  static getGameInfo(
    params: {
      /**  */
      gameId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game/{gameId}';
      url = url.replace('{gameId}', params['gameId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   * Lấy bộ lọc trò chơi
   */
  static getFilterGame(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game/filter';

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

  /** Đường dẫn ảnh đại diện game */
  image_url?: string;

  /** Tiêu đề game */
  title?: string;

  /** Mô tả game */
  description?: string;

  /** Thời gian chơi tối thiểu */
  min_play_time?: number;

  /** Thời gian chơi tối đa */
  max_play_time?: number;

  /** Số người chơi tối thiểu */
  min_players?: number;

  /** Số người chơi tối đa */
  max_players?: number;

  /**  */
  genres?: GenreDTO[];

  /** Độ phổ biến của game */
  popular?: boolean;

  /** Game hot */
  hot?: boolean;

  /** Game được đánh giá cao */
  top_rated?: boolean;
}

export interface GenreDTO {
  /** Mã định danh duy nhất của thể loại */
  id?: string;

  /** Tên của thể loại */
  name?: string;
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

export interface BannerDTO {
  /** Mã định danh duy nhất của banner */
  id?: string;

  /** Mã định danh của trò chơi liên kết với banner */
  game_id?: string;

  /** URL hình ảnh của trò chơi */
  game_image_url?: string;

  /** URL hình ảnh hộp trò chơi */
  game_image_box_url?: string;

  /** Tiêu đề của trò chơi */
  game_title?: string;

  /** Mô tả ngắn gọn về trò chơi */
  game_description?: string;

  /** URL hướng dẫn chơi trò chơi */
  game_tutorial_url?: string;

  /** URL video chơi trò chơi */
  game_play_url?: string;
}

export interface RListBannerDTO {
  /**  */
  code?: number;

  /**  */
  msg?: string;

  /**  */
  data?: BannerDTO[];

  /**  */
  ts?: string;
}

export interface GameDTO {
  /** Mã định danh duy nhất của trò chơi */
  id?: string;

  /** URL hình ảnh của trò chơi */
  image_url?: string;

  /** URL hình ảnh hộp trò chơi */
  image_box_url?: string;

  /** Tên của trò chơi */
  name?: string;

  /** Tiêu đề của trò chơi */
  title?: string;

  /** Mô tả chi tiết về trò chơi */
  description?: string;

  /** Thời gian chơi tối thiểu (phút) */
  min_play_time?: number;

  /** Thời gian chơi tối đa (phút) */
  max_play_time?: number;

  /** Số lượng người chơi tối thiểu */
  min_players?: number;

  /** Số lượng người chơi tối đa */
  max_players?: number;

  /** Danh sách thể loại của trò chơi */
  genres?: GenreDTO[];

  /** Trò chơi có phổ biến không */
  popular?: boolean;

  /** Trò chơi có đang hot không */
  hot?: boolean;

  /** Trò chơi có được đánh giá cao không */
  top_rated?: boolean;

  /** URL video chơi trò chơi */
  play_url?: string;
}

export interface PageDTOGameDTO {
  /**  */
  list?: GameDTO[];

  /**  */
  page?: number;

  /**  */
  size?: number;

  /**  */
  total?: string;
}

export interface RPageDTOGameDTO {
  /**  */
  code?: number;

  /**  */
  msg?: string;

  /**  */
  data?: PageDTOGameDTO;

  /**  */
  ts?: string;
}

export interface RGameDTO {
  /**  */
  code?: number;

  /**  */
  msg?: string;

  /**  */
  data?: GameDTO;

  /**  */
  ts?: string;
}

export interface GamePlayTimeDTO {
  /** Mã định danh duy nhất của thời gian chơi */
  id?: string;

  /** Hiển thị thời gian chơi */
  display?: string;
}

export interface GamePlayersDTO {
  /** Mã định danh duy nhất của số lượng người chơi */
  id?: string;

  /** Hiển thị số lượng người chơi */
  display?: string;
}

export interface GetFilterGameResponse {
  /** Danh sách số lượng người chơi */
  players?: GamePlayersDTO[];

  /** Danh sách thời gian chơi */
  play_times?: GamePlayTimeDTO[];

  /** Danh sách thể loại trò chơi */
  genres?: GenreDTO[];
}

export interface RGetFilterGameResponse {
  /**  */
  code?: number;

  /**  */
  msg?: string;

  /**  */
  data?: GetFilterGameResponse;

  /**  */
  ts?: string;
}
