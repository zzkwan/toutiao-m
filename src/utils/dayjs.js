// import Vue from 'vue' vue3不允许使用filter

import dayjs from 'dayjs'

//配置中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

//配置处理相对时间
dayjs.extend(relativeTime)

//配置使用中文语言包
dayjs.locale('zh-cn')

//把处理相对时间的代码包装为过滤器
//只是一个可调用函数

const relaTim = function (value) {
    return dayjs(value).from(dayjs())
}

export default {
    relaTim
}

// console.log(dayjs('2008-01-01').from(dayjs()));