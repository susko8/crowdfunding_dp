<template>
    <v-container fluid class="overlay-container">
        <loading v-if="loading"/>
        <div v-else>
            <v-layout>
                <v-spacer/>
                <v-btn
                        icon
                        @click="$emit('close-login')"
                        right>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-layout>
            <h3 class="text-center">Login</h3>
            <v-row>
                <v-col cols="12">
                    <h4>Login or email</h4>
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
                    <h4>Password</h4>
                    <v-text-field
                            type="password"
                            solo
                            light
                            v-model="loginData.password"
                            label="Password"
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
                            @click="redirect('register')"
                    >Register
                    </v-btn>
                </v-col>
            </v-row>
        </div>
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
    </v-container>
</template>

<script>
  import AuthenticationService from '../../services/authentication-service'
  import Loading from '../Common/Loading'

  export default {
    name: 'Login',
    components: {Loading},
    data: () => ({
      loginData: {
        login: '',
        password: ''
      },
      snackBar: {
        show: false,
        message: '',
        color: ''
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
            let user = {
              id: response.data.user.id,
              login: response.data.user.login,
              userRole: response.data.user.userRoleEnum
            }
            AuthenticationService.setToken(response.data.jwt, user)
            location.reload()
          })
          .catch(() => {
              this.message('Bad credentials', 'error')
              this.loading = false
            }
          )
      },
      redirect (path) {
        this.$router.push({path: path})
        this.$emit('close-login')
      },
      message (msg, color) {
        this.snackBar.show = true
        this.snackBar.message = msg
        this.snackBar.color = color
      }
    }
  }
</script>

<style scoped>
</style>
