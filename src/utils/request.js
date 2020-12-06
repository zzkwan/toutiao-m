import axios from 'axios'

import store from "@/store"

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn/'
})

//请求拦截
request.interceptors.request.use(function (config) {
    const { user } = store.state

    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    //处理完的config必须返回
    return config
}, function (error) {
    return Promise.reject(error)
})

//响应拦截

export default request