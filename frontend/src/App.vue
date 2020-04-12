<template>
  <v-app>
     <main-view></main-view>
  </v-app>
</template>

<script>

import MainView from './components/MainComponent'
export default {
  name: 'App',

  components: {MainView},

  data: () => ({
  }),
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from Metamask.vue')
    this.$store.dispatch('registerWeb3')
  },

};
</script>
