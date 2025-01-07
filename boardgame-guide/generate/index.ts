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

export class TableService {
  /**
   *
   */
  static getListTableInfo(
    params: {
      /** Trang */
      page?: number;
      /** Số lượng */
      size?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/table';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], size: params['size'] };

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static createNewTable(
    params: {
      /** requestBody */
      body?: CreateNewTableRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/table';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static getTableInfo(
    params: {
      /**  */
      tableId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/table/{tableId}';
      url = url.replace('{tableId}', params['tableId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
}

export class GameService {
  /**
   *
   */
  static startTurn(
    params: {
      /**  */
      gameId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game/{gameId}/turn/start';
      url = url.replace('{gameId}', params['gameId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static endTurn(
    params: {
      /**  */
      gameId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game/{gameId}/turn/end';
      url = url.replace('{gameId}', params['gameId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static turnBonusActionTakeNoble(
    params: {
      /**  */
      gameId: string;
      /** requestBody */
      body?: TurnBonusActionTakeNobleRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game/{gameId}/turn/bonus-action/take-noble';
      url = url.replace('{gameId}', params['gameId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static turnActionReserveCard(
    params: {
      /**  */
      gameId: string;
      /** requestBody */
      body?: TurnActionReserveCardRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game/{gameId}/turn/action/reserve-card';
      url = url.replace('{gameId}', params['gameId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static turnActionGatherGem(
    params: {
      /**  */
      gameId: string;
      /** requestBody */
      body?: TurnActionGatherGemRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game/{gameId}/turn/action/gather-gem';
      url = url.replace('{gameId}', params['gameId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static turnActionBuyCard(
    params: {
      /**  */
      gameId: string;
      /** requestBody */
      body?: TurnActionBuyCardRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game/{gameId}/turn/action/buy-card';
      url = url.replace('{gameId}', params['gameId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static startGame(
    params: {
      /**  */
      gameId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game/{gameId}/start';
      url = url.replace('{gameId}', params['gameId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  static initGame(
    params: {
      /** requestBody */
      body?: InitGameRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/game/init';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
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
  static token(
    params: {
      /**  */
      accountId: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/test/token';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { accountId: params['accountId'] };

      axios(configs, resolve, reject);
    });
  }
}

export interface CreateNewTableRequest {
  /** Số lượng người chơi */
  number_player?: number;
}

export interface RSplendorTableDTO {
  /**  */
  code?: number;

  /**  */
  msg?: string;

  /**  */
  data?: SplendorTableDTO;

  /**  */
  ts?: string;
}

export interface SplendorTableDTO {
  /** Id bàn */
  table_id?: string;

  /** Số lượng người chơi */
  number_player?: number;

  /** Danh sách id người chơi */
  user_ids?: string[];

  /** Trạng thái (0: chờ; 1: đang tìm người chơi; 2: trong game) */
  status?: number;

  /** Id chủ phòng */
  host_id?: string;
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

export interface TurnBonusActionTakeNobleRequest {
  /** Id quý tộc lấy */
  noble_id?: string;
}

export interface TurnActionReserveCardRequest {
  /** Số lượng lấy ẩn thẻ 1 */
  desk1?: number;

  /** Số lượng lấy ẩn thẻ 2 */
  desk2?: number;

  /** Số lượng lấy ẩn thẻ 3 */
  desk3?: number;

  /** Id thẻ bài lấy */
  card_id?: string;

  /** Số lượng vàng tương tác (+ lấy, - trả) */
  gold?: number;
}

export interface TurnActionGatherGemRequest {
  /** Số lượng mã não tương tác (+ lấy, - trả) */
  gold?: number;

  /** Số lượng mã não tương tác (+ lấy, - trả) */
  onyx?: number;

  /** Số lượng hồng ngọc tương tác (+ lấy, - trả) */
  ruby?: number;

  /** Số lượng ngọc lục bảo tương tác (+ lấy, - trả) */
  emerald?: number;

  /** Số lượng đá saphia tương tác (+ lấy, - trả) */
  sapphire?: number;

  /** Số lượng kim cương tương tác (+ lấy, - trả) */
  diamond?: number;
}

export interface TurnActionBuyCardRequest {
  /** Id thẻ bài mua */
  card_id?: string;

  /** Số lượng vàng tương tác (+ lấy, - trả) */
  gold?: number;

  /** Số lượng mã não tương tác (+ lấy, - trả) */
  onyx?: number;

  /** Số lượng hồng ngọc tương tác (+ lấy, - trả) */
  ruby?: number;

  /** Số lượng ngọc lục bảo tương tác (+ lấy, - trả) */
  emerald?: number;

  /** Số lượng đá saphia tương tác (+ lấy, - trả) */
  sapphire?: number;

  /** Số lượng kim cương tương tác (+ lấy, - trả) */
  diamond?: number;
}

export interface InitGameRequest {
  /** Id bàn chơi */
  table_id?: string;
}

export interface CardCostVO {
  /** Số lượng mã não */
  onyx?: number;

  /** Số lượng hồng ngọc */
  ruby?: number;

  /** Số lượng ngọc lục bảo */
  emerald?: number;

  /** Số lượng đá saphia */
  sapphire?: number;

  /** Số lượng kim cương */
  diamond?: number;
}

export interface CardVO {
  /** Id bài */
  id?: string;

  /** Loại */
  type?: string;

  /** Cấp */
  level?: number;

  /**  */
  cost?: CardCostVO;
}

export interface FieldCardVO {
  /** Vị trí */
  position?: number;

  /**  */
  card?: CardVO;
}

export interface FieldNobleVO {
  /** Vị trí */
  position?: number;

  /**  */
  noble?: NobleVO;
}

export interface IngameDataVO {
  /** Số lượng người chơi */
  number_player?: number;

  /** Danh sách id người chơi */
  player_ids?: string[];

  /** Điểm kết thúc game */
  endgame_score?: number;

  /** Vòng */
  round?: number;

  /** Lượt */
  turn?: number;

  /** Trạng thái */
  turn_status?: number;

  /** Người chơi hiện tại */
  current_player?: string;

  /** Người chơi tiếp theo */
  next_player?: string;

  /** Thông tin quý tộc trong deck */
  deck_noble?: NobleVO[];

  /** Thông tin quý tộc trên sân */
  field_noble?: FieldNobleVO[];

  /** Thông tin bài cấp 1 trong deck */
  deck_card1?: CardVO[];

  /** Thông tin bài cấp 1 trên sân */
  field_card1?: FieldCardVO[];

  /** Thông tin bài cấp 2 trong deck */
  deck_card2?: CardVO[];

  /** Thông tin bài cấp 2 trên sân */
  field_card2?: FieldCardVO[];

  /** Thông tin bài cấp 3 trong deck */
  deck_card3?: CardVO[];

  /** Thông tin bài cấp 3 trên sân */
  field_card3?: FieldCardVO[];

  /** Vàng */
  gold?: number;

  /** Mã não */
  onyx?: number;

  /** Hồng ngọc */
  ruby?: number;

  /** Ngọc lục bảo */
  emerald?: number;

  /** Đá saphia */
  sapphire?: number;

  /** Kim cương */
  diamond?: number;

  /** Thông tin dữ liệu của người chơi trong game */
  players?: IngamePlayerDataVO[];
}

export interface IngamePlayerDataVO {
  /** Id người chơi */
  player_id?: string;

  /** Điểm */
  score?: number;

  /** Thông tin quý tộc sở hữu */
  nobles?: NobleVO[];

  /** Thông tin bài đã mua */
  cards?: CardVO[];

  /** Thông tin bài dự trữ */
  reserve_cards?: CardVO[];

  /** Vàng */
  gold?: number;

  /** Mã não nền */
  card_onyx?: CardVO[];

  /** Mã não */
  onyx?: number;

  /** Hồng ngọc nền */
  card_ruby?: CardVO[];

  /** Hồng ngọc */
  ruby?: number;

  /** Ngọc lục bảo nền */
  card_emerald?: CardVO[];

  /** Ngọc lục bảo */
  emerald?: number;

  /** Đá saphia nền */
  card_sapphire?: CardVO[];

  /** Đá saphia */
  sapphire?: number;

  /** Kim cương nền */
  card_diamond?: CardVO[];

  /** Kim cương */
  diamond?: number;
}

export interface NobleCostVO {
  /** Số lượng bài mã não */
  card0nyx?: number;

  /** Số lượng bài hồng ngọc */
  card_ruby?: number;

  /** Số lượng bài ngọc lục bảo */
  card_emerald?: number;

  /** Số lượng bài đá saphia */
  card_sapphire?: number;

  /** Số lượng bài kim cương */
  card_diamond?: number;
}

export interface NobleVO {
  /** Id quý tộc */
  id?: string;

  /**  */
  cost?: NobleCostVO;
}

export interface RSplendorGameDTO {
  /**  */
  code?: number;

  /**  */
  msg?: string;

  /**  */
  data?: SplendorGameDTO;

  /**  */
  ts?: string;
}

export interface SplendorGameDTO {
  /** Id game */
  game_id?: string;

  /** Danh sách id người chơi */
  player_ids?: string[];

  /** Trạng thái */
  status?: number;

  /** Thông tin các quý tộc */
  nobles?: NobleVO[];

  /** Thông tin các lá bài */
  cards?: CardVO[];

  /**  */
  ingame_data?: IngameDataVO;
}

export interface PageDTOSplendorTableDTO {
  /**  */
  list?: SplendorTableDTO[];

  /**  */
  page?: number;

  /**  */
  size?: number;

  /**  */
  total?: string;
}

export interface RPageDTOSplendorTableDTO {
  /**  */
  code?: number;

  /**  */
  msg?: string;

  /**  */
  data?: PageDTOSplendorTableDTO;

  /**  */
  ts?: string;
}
