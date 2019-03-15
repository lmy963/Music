// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from "axios"
import router from './router'
import Lazyload  from "vue-lazyload"
import store from "./store"
import { Progress } from  "mint-ui" 
Vue.component(Progress.name, Progress);
Vue.use(Lazyload, {
 loading: '../static/logo.png',
  attempt: 2
})
Vue.config.productionTip = false
import './common/style/resset.css'
Axios.interceptors.response.use(function(res){
  return res.data
},function(err){
  return Promise.reject(err)
})
Vue.prototype.$axios = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>',
  store
})
