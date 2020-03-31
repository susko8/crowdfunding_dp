<template>
    <v-container>
        {{project}}
    </v-container>
</template>

<script>
  export default {
    name: 'ProjectDetailComponent',
    mounted () {
      this.project = this.$route.params.id
    },
    data: () => ({
      project: {}
    })
  }
</script>

<style scoped>

</style>
