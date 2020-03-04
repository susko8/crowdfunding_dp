import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    jwtToken: ''
  },
  mutations: {
    change (state, jwtToken) {
      state.jwtToken = jwtToken
    }
  },
  getters: {
    jwtToken: state => state.jwtToken
  }
});
