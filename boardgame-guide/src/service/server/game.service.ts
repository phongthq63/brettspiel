import {getConfigs, IRequestOptions, ServiceOptions} from "@/service/axios.service";
import {instanceGameServer} from "@/service/server/axios/game";

export const basePath = ''

export interface IRequestConfig {
    method?: any;
    headers?: any;
    url?: any;
    data?: any;
    params?: any;
}

// Add default options
export const serviceServerOptions: ServiceOptions = {
    axios: instanceGameServer
};

// Instance selector
export async function axiosServer(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
    if (serviceServerOptions.axios) {
        try {
            const res = await serviceServerOptions.axios.request(configs);
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
     * Lấy thông tin trò chơi
     */
    static getGameInfo(
        params: {
            /**  */
            gameId: string;
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<RGameDetailDTO> {
        return new Promise((resolve, reject) => {
            let url = basePath + '/game/{gameId}';
            url = url.replace('{gameId}', params['gameId'] + '');

            const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

            axiosServer(configs, resolve, reject);
        });
    }
}



export interface GenreDTO {
    /** Mã định danh duy nhất của thể loại */
    id?: string;

    /** Tên của thể loại */
    name?: string;
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

export interface GameDetailDTO extends GameDTO {
    /** URL huớng dẫn chơi trò chơi */
    tutorial_url?: string

    /** URL hình ảnh tên trò chơi */
    image_name_url?: string

    /** URL hình ảnh banner của trò chơi */
    image_banner_url?: string;

    /** Danh sách nhà thiết kế của trò chơi */
    designers?: string[];

    /** Danh sách nhà phát triển của trò chơi */
    artists?: string[];

    /** Danh sách nhà xuất bản của trò chơi */
    publishers?: string[];

    /** Năm phát hành của trò chơi */
    year?: number;

    /** Số lượng trò chơi đã được chơi */
    games_played?: number;

    /** Độ phức tạp của trò chơi */
    complexity?: number;

    /** Chỉ số chiến lược của trò chơi */
    strategy?: number;

    /** Chỉ số may mắn của trò chơi */
    luck?: number;

    /** Chỉ số tương tác của trò chơi */
    interaction?:number;

    /** Danh sách luật chơi của trò chơi */
    rules?: GameRuleDTO[];

    /** Danh sách video của trò chơi */
    videos?: GameVideoDTO[];

    /** Danh sách liên kết đến các tài nguyên bên ngoài của trò chơi */
    links?: GameLinkDTO[];

    /** Danh sách mở rộng của trò chơi */
    expansions?: GameExpansionDTO[];

    /** Thông tin chuẩn bị cho mở rộng trò chơi */
    setup?: any;
}

export interface GameExpansionDTO {
    /** Mã định danh duy nhất của mở rộng trò chơi */
    id?: string;

    /** Mã định danh duy nhất của mở rộng trò chơi */
    game_id?: string;

    /** Tên của mở rộng trò chơi */
    name?: string;

    /** Tên của mở rộng trò chơi */
    title?: string;

    /** URL hình ảnh của mở rộng trò chơi */
    image_url?: string;

    /** URL hình ảnh hộp mở rộng trò chơi */
    image_box_url?: string;

    /** Mô tả chi tiết về mở rộng trò chơi */
    description?: string;

    /** Số lượng người chơi tối thiểu */
    min_players?: number;

    /** Số lượng người chơi tối đa */
    max_players?: number;

    /** Danh sách luật chơi của trò chơi */
    rules?: GameRuleDTO[];

    /** Thông tin chuẩn bị cho mở rộng trò chơi */
    setup?: any;
}

export interface GameLinkDTO {
    /** Unique identifier for the game link */
    id?: string;

    /** Identifier of the game to which this link belongs */
    game_id?: string;

    /** Name of the game link */
    name?: string;

    /** URL to the icon representing the link */
    icon_url?: string;

    /** URL to the external resource or website */
    url?: string;
}

export interface GameVideoDTO {
    /** Mã định danh duy nhất của video */
    id?: string;

    /** Mã của trò chơi mà video này thuộc về */
    game_id?: string;

    /** Tiêu đề của video */
    title?: string;

    /** Nền tảng của video (ví dụ: YouTube, Vimeo) */
    platform?: string;

    /** URL đến hình ảnh thu nhỏ của video */
    thumbnail_url?: string;

    /** URL đến source của video */
    url?: string;
}

export interface GameRuleDTO {
    /** Mã định danh duy nhất của luật chơi */
    id?: string;

    /** Mã của trò chơi mà luật này thuộc về */
    game_id?: string;

    /** Tên của luật chơi */
    name?: string;

    /** Ngôn ngữ của luật chơi */
    language?: string;

    /** URL đến biểu tượng hình ảnh đại diện cho luật */
    language_icon_url?: string;

    /** URL đến tài liệu chứa chi tiết về luật chơi */
    document_url?: string;
}

export interface RGameDetailDTO {
    /**  */
    code?: number;

    /**  */
    msg?: string;

    /**  */
    data?: GameDetailDTO;

    /**  */
    ts?: string;
}
