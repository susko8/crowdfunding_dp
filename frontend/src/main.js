import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import {routes} from './router.js'

Vue.use(VueRouter)

Vue.config.productionTip = false

import "@/assets/styles.css"

const router = new VueRouter({
  base: 'public',
  mode: 'history',
  routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
