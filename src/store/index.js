import { createStore } from 'vuex'
import { getItem, setItem } from "@/utils/storage.js"

const USER = 'User'

export default createStore({
  //提供唯一公共数据源
  state: {
    user: getItem(USER)
  },
  //用于修改state数据，不能写异步函数，使用commit触发
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(USER, state.user)
    }
  },
  //处理异步操作，使用dispatch触发，不能直接修改state中的数据，必须使用contest.commit修改
  actions: {
  },
  modules: {
  }
})
