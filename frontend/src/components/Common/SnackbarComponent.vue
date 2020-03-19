<template>
    <v-snackbar
            v-model="showSnackbar"
            :timeout="3000"
    > {{message}}
        <v-btn
                color="white"
                text
                @click="showSnackbar = false"
        > Close
        </v-btn>
    </v-snackbar>
</template>

<script>
  export default {
    name: 'Snackbar',
    props: {
      show: {
        type: Boolean,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    },
    data: () => ({}),
    computed: {
      showSnackbar: {
        get: function showSnackbar () {
          return this.show
        },
        set: function (val) {
          this.show = val
        }
      }
    }
  }
</script>

<style scoped>

</style>
