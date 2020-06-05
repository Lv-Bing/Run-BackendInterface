import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/styles/reset.css'
import './assets/styles/common.css'
import './plugins/element.js'
import './plugins/vcharts.js'
import 'swiper/dist/css/swiper.css'
import '@/assets/icons/iconfont.css'

import axios from 'axios'
import qs from 'qs'


axios.defaults.withCredentials=true;

axios.defaults.baseURL = '/api'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(config => {
        console.log(config)
        config.headers.Authorization = window.sessionStorage.getItem('token')
            // 在最后必须 return config
        return config
    })
axios.interceptors.response.use(config => {
    return config
})

Vue.prototype.$http = axios

Vue.prototype.qs = qs;

Vue.prototype.axios = axios;

Vue.config.productionTip = false


Vue.use(VueAwesomeSwiper)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')