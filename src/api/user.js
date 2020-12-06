// 用户相关请求模块
import request from '@/utils/request'
//在非组件模块获取store必须使用加载方式
// import store from "@/store"

export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}

export const getCurrentUser = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user'
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}