/**
 * @description 基于axios
 * @description 支持中间件
 */
import type { AxiosInstance, AxiosStatic, CreateAxiosDefaults } from "axios";
import axios, { type AxiosRequestConfig } from "axios";
import { businessEnum, type enumsBusType } from "../types";
// import {message} from 'src/ui'

/**
 *
 * @param url
 * @description  在使用别名方法时， url、method、data 这些属性都不必在配置中指定
 * @param params
 * @returns
 */
const AxiosGet = async (url: string, params: AxiosRequestConfig) => {
  return axios
    .get(url, params)
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
/**
 *
 * @param url
 * @description  在使用别名方法时， url、method、data 这些属性都不必在配置中指定
 * @param params
 * @returns
 */
const AxiosPost = async (
  url: string,
  data: Record<string, any>,
  params: AxiosRequestConfig
) => {
  return axios
    .post(url, data, params)
    .then((data) => {
      return Promise.resolve(data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

/**
 * @param baseUrl 业务域名  支持 yomi zhuiya bos hgame 选项 和自定义 域名参数
 * @param method 请求参数  "GET" | "POST" | "HEAD" | "PUT" | "DELETE" = 'GET' 默认GET
 * @param headers 请求headers
 * @param configBase 配置参数 可覆盖原有配置 CreateAxiosDefaults 类型
 * @function get
 * @function post
 * @function http 自定义请求
 */

class BizRequest {
  private baseUrl: string | enumsBusType;
  private headers: Record<string, any> = {};
  private instance: AxiosStatic = axios;
  private methods: string;
  private configBase: CreateAxiosDefaults = {};

  private baseBusinessUrl: Record<enumsBusType, string> = {
    yomi: "https://some-domain.com/api/",
    zhuiya: "https://some-domain.com/api/",
    bos: "https://some-domain.com/api/",
    hgame: "https://some-domain.com/api/",
  };

  // 'Content-Type': 'application/x-www-form-urlencoded' url encode
  // 'Content-Type': 'multipart/form-data' formData
  // 'Content-Type': 'application/json' json

  constructor(
    baseUrl = "https://some-domain.com/api/",
    method:
      | "GET"
      | "POST"
      | "HEAD"
      | "PUT"
      | "DELETE"
      | "PATCH"
      | "OPTIONS" = "GET",
    headers: Record<string, any> = {},
    params: CreateAxiosDefaults = {}
  ) {
    this.baseUrl = this.isEnumType(baseUrl)
      ? this.preGetBusinessUrl(baseUrl)
      : baseUrl;
    this.methods = method;
    this.headers = headers;
    this.configBase = params;
  }

  preGetBusinessUrl(type: enumsBusType): string {
    return this.baseBusinessUrl[type];
  }

  isEnumType(value: any): value is enumsBusType {
    return Object.values(businessEnum).includes(value);
  }

  /**
   * @description 自定义请求
   * @returns
   */
  async http(): Promise<AxiosInstance> {
    if (!this.methods) {
      //   message.error('未初始化请求类型')
      console.error("未初始化请求类型");
      return Promise.reject();
    }
    if (!this.baseUrl) {
      console.error("未初始化请求域名");
      //   message.error('未初始化请求域名')
      return Promise.reject();
    }
    return this.instance.create({
      method: this.methods,
      headers: this.headers,
      url: this.baseUrl,
      ...this.configBase,
    });
  }

  /**
   * @description 请求拦截
   * @param requestFn 请求拦截成功回调
   * @param requestErr 请求拦截失败回调
   */
  requestInterceptor(
    requestFn: <T>(c: T) => T | Promise<T>,
    requestErr: <T>(c: T) => T | Promise<T>
  ) {
    // Add a request interceptor
    this.instance.interceptors.request.use(
      function (config) {
        return requestFn(config);
      },
      function (error) {
        // message.error(error)
        return requestErr(error);
      }
    );
  }

  /**
   * @description 响应拦截
   * @param responseFn 响应拦截成功回调
   * @param responseErr 响应拦截失败回调
   */
  responseInterceptor(
    responseFn: <T>(c: T) => T | Promise<T>,
    responseErr: <T>(c: T) => T | Promise<T>
  ) {
    // Add a response interceptor
    this.instance.interceptors.response.use(
      function (response) {
        return responseFn(response);
      },
      function (error) {
        return responseErr(error);
      }
    );
  }

  /**
   *
   * @param params
   * @description 自定义参数实例 服务于基础 GET POST 请求
   * @returns
   */

  instanceWithAxios(params: CreateAxiosDefaults = {}) {
    const headers = params.headers;
    return this.instance.create({
      baseURL: this.baseUrl,
      timeout: 1000,
      withCredentials: true,
      headers: {
        ...headers,
      },
      ...params,
    });
  }

  /**
   *
   * @param url get 请求参数 不包含域名部分
   * @param config 支持 params 传参  自定义headers 参数等
   * @returns
   */
  async get(url: string, config: AxiosRequestConfig = {}) {
    const headers = config.headers;
    return this.instanceWithAxios().get(url, {
      headers: {
        ...headers,
      },
    });
  }

  /**
   *
   * @param url post 请求参数 不包含域名部分
   * @param data post data 传参
   * @param config 自定义headers 参数等
   * @returns
   */
  async post(
    url: string,
    data: Record<string, any>,
    config: AxiosRequestConfig = {}
  ) {
    const headers = config.headers;
    return this.instanceWithAxios().post(
      url,
      { ...data },
      {
        headers: {
          ...headers,
        },
      }
    );
  }
}

const request = new BizRequest();

export { BizRequest, AxiosGet, AxiosPost };
export default request;
