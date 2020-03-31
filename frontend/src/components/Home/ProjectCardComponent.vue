<template>
    <v-card class="mx-auto pointer"
            max-width="400"
            min-width="400"
            min-height="400"
            max-height="400"
            @click="redirectToProject(project)">
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

        <v-card-actions>
            <v-btn
                    color="#1E1E1E"
                    text>
                Contribute
            </v-btn>

            <v-btn
                    color="#1E1E1E"
                    text>
                Read more...
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'ProjectCardComponent',
    props: ['project'],
    data () {
      return {
        progress: 50
      }
    },
    methods: {
      redirectToProject (project) {
        this.$router.push('project/' + project.id)
      }
    }
  }
</script>

<style scoped>
.project-description{
    min-height: 50px;
    max-height: 50px;
}
</style>
