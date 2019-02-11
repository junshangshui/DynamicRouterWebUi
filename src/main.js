import Vue from 'vue'
import App from './App'
import router from './router/router'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { store } from './store/store.js'
import axios from './common/axiosHelper'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  axios: axios,
  components: { App },
  template: '<App/>'
})
