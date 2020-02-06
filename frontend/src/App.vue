<template>
  <v-app>
      <v-card>
          <v-toolbar dense dark>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>Blockchain Crowdfunding</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
          </v-toolbar>
      </v-card>
      <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
