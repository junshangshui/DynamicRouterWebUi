import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    token: '',
    menus: Array
  },
  getters: {
  },
  mutations: {
    login: (state, data) => {
      window.localStorage.setItem('token', data)
      state.token = data
    },
    logout: (state) => {
      window.localStorage.removeItem('token')
      state.token = null
    },
    setMenus: (state, data) => {
      state.menus = data
    }
  },
  actions: {
  }
})
