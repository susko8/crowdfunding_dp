import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import {routes} from './router.js'
import '@/assets/styles.css'
import Vuex from 'vuex'
import 'es6-promise/auto'
import {store} from './store/'
import axios from 'axios'
import VueDisqus from 'vue-disqus'
import firebase from 'firebase';
import vars from './dev-env-variables.js'
import AppPlugin from './plugins/AppPlugin'
import moment from 'moment'


Vue.prototype.moment = moment
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(VueDisqus)
firebase.initializeApp(vars.firebaseConfig);
firebase.analytics();

Vue.use(AppPlugin, { store })

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('jwtToken')
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    Promise.reject(error)
  })

const router = new VueRouter({
  base: 'public',
  mode: 'history',
  routes
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
