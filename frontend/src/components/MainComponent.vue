<template>
    <v-content>
        <v-card>
            <v-toolbar dense flat dark>

                <v-toolbar-title class="home-link"
                                 @click="redirect('home')"
                >Blockchain Crowdfunding
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn v-if="!loggedIn"
                       icon
                       color="#fff"
                       class="mr-4"
                       @click="overlay=!overlay">
                    Login
                </v-btn>
                <v-btn v-if="!loggedIn"
                       icon
                       color="#fff"
                       class="mr-4 ml-5"
                       @click="redirect('register')">
                    Register
                </v-btn>
                <v-btn v-if="loggedIn" icon
                       color="#fff"
                       class="mr-4">
                    {{user.login}}
                </v-btn>
            </v-toolbar>
        </v-card>
        <v-overlay :value="overlay"
                   opacity="0.9">
            <login @close-login="overlay=!overlay"
                   @login="doLogin()"/>
        </v-overlay>
        <router-view/>
    </v-content>
</template>

<script>

  import Login from './UserManagement/LoginComponent'

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
      },
      redirect (path) {
        this.$router.push({path: path})
      }
    }
  }
</script>

<style scoped>

</style>
