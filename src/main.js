import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.less'

import Vant from 'vant';
import 'vant/lib/index.css';

//创建Vue根实例
createApp(App).use(store).use(router).use(Vant).mount('#app')
