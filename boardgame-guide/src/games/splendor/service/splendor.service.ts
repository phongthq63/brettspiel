import {IRequestOptions, serviceOptions} from "@/service/axios.service";


export const basePath = '';

export interface IRequestConfig {
    method?: any;
    headers?: any;
    url?: any;
    data?: any;
    params?: any;
}

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
            const url = basePath + '/table';

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
            const url = basePath + '/table';

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

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

export interface CreateNewTableRequest {
    /** Số lượng người chơi */
    number_player?: number;
}