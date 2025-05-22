import {getConfigs, IRequestOptions, ServiceOptions} from "@/service/axios.service";
import {instanceSplendor} from "@/games/splendor/service/axios/splendor";


export const basePath = ''

export interface IRequestConfig {
    method?: any;
    headers?: any;
    url?: any;
    data?: any;
    params?: any;
}

// Add default options
export const serviceOptions: ServiceOptions = {
    axios: instanceSplendor
};

// Instance selector
export async function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
    if (serviceOptions.axios) {
        try {
            const res = await serviceOptions.axios.request(configs);
            resolve(res.data);
        } catch (err) {
            reject(err);
        }
    } else {
        throw new Error('please inject yourself instance like axios  ');
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
            let url = basePath + '/{gameId}/turn/start';
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
            let url = basePath + '/{gameId}/turn/end';
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
            let url = basePath + '/{gameId}/turn/bonus-action/take-noble';
            url = url.replace('{gameId}', params['gameId'] + '');

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

            axios(configs, resolve, reject);
        });
    }
    /**
     *
     */
    static turnActionSkip(
        params: {
            /**  */
            gameId: string;
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/{gameId}/turn/action/skip';
            url = url.replace('{gameId}', params['gameId'] + '');

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

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
            let url = basePath + '/{gameId}/turn/action/reserve-card';
            url = url.replace('{gameId}', params['gameId'] + '');

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

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
            let url = basePath + '/{gameId}/turn/action/gather-gem';
            url = url.replace('{gameId}', params['gameId'] + '');

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

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
            let url = basePath + '/{gameId}/turn/action/buy-card';
            url = url.replace('{gameId}', params['gameId'] + '');

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

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
            let url = basePath + '/{gameId}/start';
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
            const url = basePath + '/init';

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

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
    ): Promise<RSplendorGameDTO> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/{gameId}';
            url = url.replace('{gameId}', params['gameId'] + '');

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

            axios(configs, resolve, reject);
        });
    }
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

export interface CardVO {
    /** Id bài */
    id: string;

    /** Loại */
    type?: string;

    /** Cấp */
    level?: number;
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

    /** Điểm kết thúc gamedetail */
    endgame_score?: number;

    /** Vòng */
    round?: number;

    /** Lượt */
    turn?: number;

    /** Trạng thái lượt */
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

    /** Thông tin dữ liệu của người chơi trong gamedetail */
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

export interface NobleVO {
    /** Id quý tộc */
    id: string;
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
    /** Id gamedetail */
    game_id?: string;

    /** Danh sách thông tin người chơi */
    players?: PlayerDTO[];

    /** Trạng thái */
    status?: number;

    /**  */
    config?: SplendorGameConfigDTO;

    /**  */
    ingame_data?: IngameDataVO;
}

export interface SplendorGameConfigDTO {
    /** The score required to end the game */
    endgame_score?: number;

    /** The number of players in the game */
    number_player?: number;

    /** The list of cards available in the game */
    cards?: CardVO[];

    /** The list of nobles available in the game */
    nobles?: NobleVO[];

    /** The number of nobles available */
    noble?: number;

    /** The number of gold tokens available */
    gold?: number;

    /** The number of onyx tokens available */
    onyx?: number;

    /** The number of ruby tokens available */
    ruby?: number;

    /** The number of emerald tokens available */
    emerald?: number;

    /** The number of sapphire tokens available */
    sapphire?: number;

    /** The number of diamond tokens available */
    diamond?: number;
}

export interface PlayerDTO {
    /** ID của người chơi */
    id?: string;

    /** URL ảnh đại diện */
    avatar_url?: string;

    /** Tên người chơi */
    name?: string;

    /** Ngôn ngữ của người chơi */
    local?: string;

    /**  */
    bot?: boolean;

    /**  */
    player?: boolean;
}
