<template>
    <v-content>
        <v-card>
            <v-toolbar dense dark>

                <v-toolbar-title>Blockchain Crowdfunding</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon
                       color="#fff"
                       class="mr-4"
                       @click="overlay=!overlay">
                    Login
                </v-btn>
            </v-toolbar>
        </v-card>
        <v-overlay :value="overlay"
                   opacity="0.7">
            <login @close-login="overlay=!overlay"/>
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
      overlay: false
    }),
  }
</script>

<style scoped>

</style>
