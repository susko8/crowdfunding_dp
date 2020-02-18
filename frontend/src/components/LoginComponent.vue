<template>
    <v-container fluid class="overlay-container">
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
                            placeholder="email"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                    <v-text-field
                            solo
                            light
                            placeholder="password"/>
            </v-col>
        </v-row>
        <v-row class="text-center">
            <v-col cols="6">
                <v-btn>Login</v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn>Register</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'Login'
  }
</script>

<style scoped>
</style>
