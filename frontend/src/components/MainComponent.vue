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
                <v-menu offset-y v-if="loggedIn"
                        open-on-hover>
                    <template v-slot:activator="{ on }">
                        <span  class="mr-4 login"
                               v-on="on">
                            {{user.login}}
                        </span>
                    </template>
                    <v-list>
                        <v-list-item
                                @click="logout()">
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar>
        </v-card>
        <v-overlay :value="overlay"
                   opacity="0.9">
            <login @close-login="overlay=!overlay"/>
        </v-overlay>
        <v-snackbar
                v-model="snackBar.show"
                :color="snackBar.color"
        > {{snackBar.message}}
            <v-btn
                    color="white"
                    text
            > Close
            </v-btn>
        </v-snackbar>
        <router-view/>
    </v-content>
</template>

<script>

  import Login from './UserManagement/LoginComponent'
  import AuthenticationService from './../services/authentication-service'

  export default {
    name: 'MainView',
    components: {Login},
    data: () => ({
      overlay: false,
      loggedIn: false,
      user: '',
      snackBar: {
        show: false,
        message: '',
        color: ''
      }
    }),
    watch: {
      $route (to, from) {
        if (from.name === 'register') {
          this.message('Registration success. Now, you can login','info')
        }
      }
    },
    created () {
      if (localStorage.getItem('user')) {
        this.loggedIn = true
        this.user = AuthenticationService.getUser()
      }
    },
    methods: {
      redirect (path) {
        this.$router.push({path: path})
      },
      message (msg, color) {
        this.snackBar.show = true
        this.snackBar.message = msg
        this.snackBar.color = color
      },
      logout () {
        AuthenticationService.logout()
      }
    }
  }
</script>

<style scoped>

</style>
