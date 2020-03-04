import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    jwtToken: '',
    user: {
      id: null,
      login: '',
      userRole: ''
    }
  },
  mutations: {
    setJwt (state, jwtToken) {
      state.jwtToken = jwtToken
    },
    setUser (state, user) {
      state.user = user
    }
  },
  getters: {
    jwtToken: state => state.jwtToken,
    user: state => state.user
  }
});
