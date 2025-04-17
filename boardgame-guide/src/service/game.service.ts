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
            const url = basePath + '/contact';

            const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

            configs.data = params.body;

            axios(configs, resolve, reject);
        });
    }
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