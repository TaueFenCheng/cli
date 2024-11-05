import * as axios from 'axios';
import { AxiosRequestConfig, CreateAxiosDefaults, AxiosInstance } from 'axios';

declare enum businessEnum {
    yomi = 1,
    zhuiya = 2,
    bos = 3,
    hgame = 4
}
type enumsBusType = keyof typeof businessEnum;

declare const AxiosGet: (url: string, params: AxiosRequestConfig) => Promise<axios.AxiosResponse<any, any>>;
declare const AxiosPost: (url: string, data: Record<string, any>, params: AxiosRequestConfig) => Promise<axios.AxiosResponse<any, any>>;
declare class BizRequest {
    private baseUrl;
    private headers;
    private instance;
    private methods;
    private configBase;
    private baseBusinessUrl;
    constructor(baseUrl?: string, method?: "GET" | "POST" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS", headers?: Record<string, any>, params?: CreateAxiosDefaults);
    preGetBusinessUrl(type: enumsBusType): string;
    isEnumType(value: any): value is enumsBusType;
    http(): Promise<AxiosInstance>;
    requestInterceptor(requestFn: <T>(c: T) => T | Promise<T>, requestErr: <T>(c: T) => T | Promise<T>): void;
    responseInterceptor(responseFn: <T>(c: T) => T | Promise<T>, responseErr: <T>(c: T) => T | Promise<T>): void;
    instanceWithAxios(params?: CreateAxiosDefaults): AxiosInstance;
    get(url: string, config?: AxiosRequestConfig): Promise<axios.AxiosResponse<any, any>>;
    post(url: string, data: Record<string, any>, config?: AxiosRequestConfig): Promise<axios.AxiosResponse<any, any>>;
}

export { AxiosGet, AxiosPost, BizRequest, businessEnum, type enumsBusType };
