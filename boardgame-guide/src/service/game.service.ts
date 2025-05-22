import {getConfigs, IRequestOptions, ServiceOptions} from "@/service/axios.service";
import {instanceGame} from "@/service/axios/game";

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
    axios: instanceGame
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



export class WelcomeService {
    /**
     * Lấy thống kê
     */
    static getStatistics(options: IRequestOptions = {}): Promise<RGetStatisticsWelcomeResponse> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/welcome/statistics';

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
    ): Promise<RListFeaturedGameDTO> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/welcome/feature/game';

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
            configs.params = { soft_by: params['softBy'], size: params['size'] };

            axios(configs, resolve, reject);
        });
    }
}

export class HomeService {
    /**
     * Lấy danh sách banner
     */
    static getListBanner(options: IRequestOptions = {}): Promise<RListBannerDTO> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/home/banner';

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

            axios(configs, resolve, reject);
        });
    }
}

export class UserService {
    /**
     * Lấy thông tin người dùng
     */
    static getMe(options: IRequestOptions = {}): Promise<RUserDTO> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/user/me';

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

            axios(configs, resolve, reject);
        });
    }
}

export class RoomService {
    /**
     *
     */
    static createRoom(
        params: {
            /** requestBody */
            body?: CreateRoomRequest;
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<RGameRoomDTO> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/room';

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

            axios(configs, resolve, reject);
        });
    }
}

export class PlayService {
    /**
     *
     */
    static startPlay(
        params: {
            /** requestBody */
            body?: StartPlayRequest;
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<RObject> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/play';

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

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
    ): Promise<RObject> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/contact';

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

            axios(configs, resolve, reject);
        });
    }
}

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
    ): Promise<RObject> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/feedback';

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

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
    ): Promise<RPageDTOGameDTO> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/game';

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
            configs.params = {
                keyword: params['keyword'],
                players: params['players']?.join(','),
                play_times: params['playTimes']?.join(','),
                genres: params['genres']?.join(','),
                soft_by: params['softBy'],
                page: params['page'],
                size: params['size']
            };

            axios(configs, resolve, reject);
        });
    }
    /**
     * Lấy bộ lọc trò chơi
     */
    static getFilterGame(options: IRequestOptions = {}): Promise<RGetFilterGameResponse> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/game/filter';

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

            axios(configs, resolve, reject);
        });
    }
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

export interface BannerDTO {
    /**  */
    id?: string;

    /**  */
    game_id?: string;

    /**  */
    image_url?: string;

    /**  */
    game_image_box_url?: string;

    /**  */
    game_title?: string;

    /**  */
    game_description?: string;

    /**  */
    game_tutorial_url?: string;

    /**  */
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

export interface RUserDTO {
    /**  */
    code?: number;

    /**  */
    msg?: string;

    /**  */
    data?: UserDTO;

    /**  */
    ts?: string;
}

export interface UserDTO {
    /** Id */
    id?: string;

    /** Tên hiển thị */
    name?: string;

    /** URL ảnh đại diện */
    avatar_url?: string;
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

export interface GameDTO {
    /** Mã định danh duy nhất của trò chơi */
    id?: string;

    type?: string;

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

    /** Tuổi chơi tối thiểu */
    min_age?: number;

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

    /** Đường dẫn đến trang hướng dẫn chơi trò chơi */
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
    total?: number;
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

export interface CreateRoomRequest {
    /** Id game */
    game_id?: string;

    /** Id session */
    session_id?: string;
}

export interface PlayerInfo {
    /** Unique identifier for the player */
    id?: string;

    /** Name of the player */
    name?: string;

    /** Indicates if this player is a bot*/
    is_bot?: boolean;

    /** Indicates if this player is a bot*/
    is_player?: boolean;

    /** Indicates if this player is the local player */
    local?: string;
}

export interface StartPlayRequest {
    /** Id game */
    room_id?: string;

    /** List of players participating in the game */
    players?: PlayerInfo[];

    /** Configuration setup for starting the game */
    setup?: object;
}

export interface GameRoomDTO {
    /** Mã định danh duy nhất của phòng chơi */
    id?: string;

    /** Mã định danh duy nhất của trò chơi */
    game_id?: string;
}

export interface RGameRoomDTO {
    /**  */
    code?: number;

    /**  */
    msg?: string;

    /**  */
    data?: GameRoomDTO;

    /**  */
    ts?: string;
}