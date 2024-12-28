import {instanceSocket, IRequestOptions, ServiceOptions} from "@/service/axios.service";


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
    axios: instanceSocket
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

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
    const configs: IRequestConfig = {
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


export class RoomService {
    /**
     *
     */
    static leaveRoom(
        params: {
            /** requestBody */
            body?: LeaveRoomRequest;
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/room/leave';

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

            axios(configs, resolve, reject);
        });
    }
    /**
     *
     */
    static joinRoom(
        params: {
            /** requestBody */
            body?: JoinRoomRequest;
        } = {} as any,
        options: IRequestOptions = {}
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = basePath + '/room/join';

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

            axios(configs, resolve, reject);
        });
    }
}


export interface JoinRoomRequest {
    /** Id người chơi */
    user_id?: string;

    /** Id phòng */
    room_id?: string;
}

export interface LeaveRoomRequest {
    /** Id người chơi */
    user_id?: string;

    /** Id phòng */
    room_id?: string;
}