<template>
    <v-container fluid class="overlay-container">
        <loading v-if="loading"/>
        <div v-else>
            <v-form
                    ref="form"
                    v-model="valid">
                <h3 class="text-center pa-3">Registration</h3>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                color="black"
                                light
                                v-model="userData.login"
                                :rules="loginRules"
                                label="Login or email"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                color="black"
                                light
                                :rules="nameRules"
                                label="First name"
                                v-model="userData.firstName"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                color="black"
                                light
                                :rules="nameRules"
                                v-model="userData.lastName"
                                label="Last name"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                type="password"
                                id="pass"
                                light
                                :rules="passwordRules"
                                v-model="userData.password"
                                label="Password"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                type="password"
                                id="passCheck"
                                light
                                :rules="passwordRules"
                                v-model="passwordCheck"
                                label="Repeat Password"/>
                    </v-col>
                </v-row>
                <v-row class="text-center">
                    <v-btn
                            class="margin-auto"
                            large
                            @click="register()"
                    >Register
                    </v-btn>
                </v-row>
            </v-form>
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
  import UserService from '../../services/user-service'
  import Loading from '../Common/Loading'

  export default {
    name: 'RegisterComponent',
    components: {Loading},
    data: () => ({
      userData: {
        login: '',
        password: '',
        firstName: '',
        lastName: '',
      },
      snackBar: {
        show: false,
        message: '',
        color: ''
      },
      valid: true,
      loginRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'Login must be less than 10 characters',
        v => (v && v.length >= 4) || 'Login must be more than 4 characters',
      ],
      nameRules: [
        v => !!v || 'Field is Required'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 5) || 'Password must be more than 5 characters',
      ],
      passwordCheck: '',
      loading: false,
      showSnackbar: false,
      snackbarMessage: ''
    }),
    methods: {
      register () {
        if (this.validate()) {
          if (this.userData.password !== this.passwordCheck) {
            this.message('Passwords must match', 'error')
            return;
          }
          this.loading = true
          UserService.register(this.userData)
            .then(response => {
              if (response.data === true) {
                this.loading = false
                this.$router.push('home')
              }
            })
        }
      },
      message (msg, color) {
        this.snackBar.show = true
        this.snackBar.message = msg
        this.snackBar.color = color
      },
      validate () {
        return this.$refs.form.validate()
      },
    }
  }
</script>

<style scoped>

</style>
