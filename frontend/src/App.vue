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

};
</script>
