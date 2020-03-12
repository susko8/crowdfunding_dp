<template>
    <v-content>
        <v-card>
            <v-toolbar dense flat dark>

                <v-toolbar-title>Blockchain Crowdfunding</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn v-if="loggedIn" icon
                       color="#fff"
                       class="mr-4">
                    {{user.login}}
                </v-btn>
                <v-btn v-else icon
                       color="#fff"
                       class="mr-4"
                       @click="overlay=!overlay">
                    Login
                </v-btn>
            </v-toolbar>
        </v-card>
        <v-overlay :value="overlay"
                   opacity="0.7">
            <login @close-login="overlay=!overlay"
                   @login="doLogin()"/>
        </v-overlay>
        <router-view/>
    </v-content>
</template>

<script>

  import Login from './LoginComponent'

  export default {
    name: 'MainView',
    components: {Login},
    data: () => ({
      overlay: false,
      loggedIn: false,
      user: ''
    }),
    created () {
      if (localStorage.getItem('user')) {
        this.loggedIn = true
        this.user = JSON.parse(localStorage.getItem('user'))
      }
    },
    methods: {
      doLogin () {
        this.loggedIn = true
        this.user = JSON.parse(localStorage.getItem('user'))
      }
    }
  }
</script>

<style scoped>

</style>
