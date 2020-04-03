<template>
    <v-container>
        <v-card class="mx-auto pointer">

            <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="project.src"
            >
            </v-img>
            <v-card-title>{{project.name}}</v-card-title>

            <v-card-subtitle class="pb-0">{{'12.3.2020'}}</v-card-subtitle>

            <v-card-text class="text--primary project-description">
                <div>{{project.description}}</div>
            </v-card-text>

            <v-progress-linear
                    v-model="progress"
                    color="grey accent-4"
                    striped
                    height="15"
            >
                <template v-slot="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                </template>
            </v-progress-linear>
        </v-card>
    </v-container>
</template>

<script>
  import ProjectService from '../../services/project-service'

  export default {
    name: 'ProjectDetailComponent',
    mounted () {
      ProjectService.getOneProject(this.$route.params.id)
        .then((res) => {
          this.project = res
          console.log(res)
        })
    },
    data: () => ({
      project: {}
    })
  }
</script>

<style scoped>

</style>
