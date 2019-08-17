import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { MAINHOST } from '@/config'

declare type Methods = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"

const baseURL = process.env.VUE_APP_WEB_API

class HttpRequest {
    public queue: any // 请求的url集合

    public constructor() {
        this.queue = {}
    }

    destroy(url: string) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // hide loading
        }
    }

    // 发起请求
    async request(options: AxiosRequestConfig) {
        options.baseURL = baseURL
        const instance = axios.create()
        await this.interceptors(instance, options.url)
        return instance(options)
    }

    // 拦截器
    interceptors(instance: any, url?: string) {
        // 请求拦截
        instance.interceptors.request.use((config: AxiosRequestConfig) => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
            // show loading
            }
            if (url) {
                // 做相同请求同时发起拦截
                // this.queue[url] = true
            }
            return config
        }, (error: any) => {
            console.error(error)
            Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use((res: AxiosResponse) => {
            if (url) {
                // this.destroy(url)
            }
            const { data } = res
            return Promise.resolve(data)
        }, (error: any) => {
            if (url) {
                // this.destroy(url)
            }
            console.error(error)
            return Promise.reject(error)
        })
    }
}

export default HttpRequest as any