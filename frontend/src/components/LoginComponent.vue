<template>
    <v-container fluid class="overlay-container">
        <loading v-if="loading"/>
        <div v-else>
            <h3 class="text-center">Login</h3>
            <v-layout>
                <v-spacer/>
                <v-btn
                        icon
                        @click="$emit('close-login')"
                        right>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-layout>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                            color="black"
                            solo
                            light
                            v-model="loginData.login"
                            placeholder="Login or email"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                            type="password"
                            solo
                            light
                            v-model="loginData.password"
                            placeholder="Password"/>
                </v-col>
            </v-row>
            <v-row class="text-center">
                <v-col cols="6">
                    <v-btn
                            large
                            light
                            @click="login()"
                    >Login
                    </v-btn>
                </v-col>
                <v-col cols="6">
                    <v-btn
                            large
                            light
                    >Register
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <v-snackbar
                v-model="showLoginError"
                :timeout="3000"
        > Bad Credentials.
            <v-btn
                    color="white"
                    text
                    @click="snackbar = false"
            > Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
  import AuthenticationService from '../services/authentication-service'
  import Loading from './Common/Loading'

  export default {
    name: 'Login',
    components: {Loading},
    data: () => ({
      loginData: {
        login: '',
        password: ''
      },
      token: null,
      loading: false,
      showLoginError: false,
    }),
    methods: {
      login () {
        this.loading = true
        AuthenticationService.login(this.loginData)
          .then(response => {
            this.$store.commit('setJwt', response.data.jwt)
            this.$store.commit('setUser',
              {
                id: response.data.user.id,
                login: response.data.user.login,
                userRole: response.data.user.userRoleEnum
              })
            this.$emit('login')
            this.$emit('close-login')
            this.loading = false
          })
          .catch(err => {
            console.log(err)
            this.loading = false
            this.showLoginError = true
          })
      }
    }
  }
</script>

<style scoped>
</style>
