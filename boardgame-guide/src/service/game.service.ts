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
     *
     */
    static getStatistics(options: IRequestOptions = {}): Promise<RGetStatisticsWelcomeResponse> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/welcome/statistics';

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
    ): Promise<RListFeaturedGameDTO> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/welcome/feature/game';

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
            configs.params = { soft_by: params['softBy'], size: params['size'] };

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
     *
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