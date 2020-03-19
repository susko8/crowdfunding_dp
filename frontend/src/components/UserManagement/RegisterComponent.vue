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
                                label="Login or email"
                                required/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                color="black"
                                light
                                label="First name"
                                v-model="userData.firstName"
                                required/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                color="black"
                                light
                                v-model="userData.lastName"
                                label="Last name"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                type="password"
                                light
                                v-model="userData.password"
                                label="Password"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                type="password"
                                light
                                v-model="passwordCheck"
                                label="Repeat Password"/>
                    </v-col>
                </v-row>
            </v-form>
            <v-row class="text-center">
                <v-btn
                        style="margin: auto"
                        large
                        @click="register()"
                >Register
                </v-btn>
            </v-row>
        </div>
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
      valid: true,
      passwordCheck: '',
      loading: false,
      showSnackbar: false
    }),
    methods: {
      register () {
        this.loading = true
        UserService.register(this.userData)
          .then(response => {
            if (response.data === true) {
              this.loading = false
              // this.showSnackbar = true;
              this.$router.push('home')
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
