import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入amfe-flexible,自动设置rem基准值
import 'amfe-flexible'

//Vant组件库
import Vant from 'vant';
//样式设置
import 'vant/lib/index.css';

//引入less总体样式
import './styles/index.less'

//创建Vue根实例
createApp(App).use(store).use(router).use(Vant).mount('#app')
