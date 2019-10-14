import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import config from "@/config"
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
            // 如果不是登录先登录再次访问api
            if (data.sussess !== config.ERR_OK && (data.errorCode === config.TOKEN_ERROR || data.errorCode === config.TOKEN_OVERDUE)) { // toke失效
                this.userLogin().then((res: any) => {
                    this._request(options, resolve, reject)
                }, (rej: any) => {
                    console.error(rej)
                })
            } else if (data.sussess !== config.ERR_OK && data.errorCode === config.NOTICE_STRONG) { // 强公告
                Dialog.alert({
                    message: data.model.content,
                    confirmButtonText: data.model.button || "确认"
                }).then(() => {
                    // 如果不是首页跳转到首页
                    if (isToIndex.indexOf(router.currentRoute.path) !== 0) {
                        router.replace({
                            path: '/index'
                        })
                    }
                })
                reject(data)
            } else {
                resolve(data)
            }
            
        }, (error: any) => {
            console.error(error)
            reject(error)
        })
    }

    /**
     * 用户登录
     * @param data 
     */
    async userLogin() {
        let userEncryption: any = localStorage.getItem('userEncryption')
        // 判断是否有加密字符串
        if (!userEncryption) {
            // 如果没有重新调用第三方获取加密字符串
            return
        }
        let options: any = {
            url: "/h5/auth/login",
            method: "POST",
            data: {
                externalUserId: userEncryption
            }
        }
        let res: any = await this.request(options)
        if (res.success === config.ERR_OK ) {
            if (res.model && res.model.token) {
                localStorage.setItem('token', res.model.token)
                return true
            }
        }
        throw new Error('token fetch failed')
    }
}

export default HttpRequest as any