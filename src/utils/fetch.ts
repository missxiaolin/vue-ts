import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
// import config from "@/config"
import router from "@/router/index"

const isToIndex: string[] = [
    "/index"
]

const baseURL = process.env.VUE_APP_WEB_API

import {
    Dialog,
} from 'vant';

class HttpRequest {
    public queue: any // 请求的url集合

    public constructor() {
        this.queue = {}
    }

    /**
     * @param url 
     */
    destroy(url: string) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // hide loading
        }
    }

    /**
     * 发起请求
     * @param options 
     */
    async request(options: AxiosRequestConfig) {
        options.baseURL = baseURL
        return new Promise((resolve, reject) => {
            this._request(options, resolve, reject)
        })
    }

    /**
     * 异步使用
     * @param options 
     * @param resolve 
     * @param reject 
     */
    _request(options: AxiosRequestConfig, resolve: any, reject: any) {
        const instance = axios.create()
        this.interceptors(instance, options, resolve, reject)
        return instance(options)
    }



    /**
     * 拦截器
     * @param instance 
     * @param options 
     * @param resolve 
     * @param reject 
     */
    async interceptors(instance: any, options: AxiosRequestConfig, resolve: any, reject: any) {
        // 请求拦截
        instance.interceptors.request.use((config: AxiosRequestConfig) => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
            // show loading
            }
            config.headers.token = localStorage.getItem("token")
            return config
        }, (error: any) => {
            console.error(error)
            reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use((res: AxiosResponse) => {
            const { data } = res
            resolve(data)
            
        }, (error: any) => {
            console.error(error)
            reject(error)
        })
    }
}

export default HttpRequest as any