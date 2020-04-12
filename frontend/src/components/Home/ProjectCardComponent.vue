<template>
    <v-card class="mx-auto"
            max-width="400"
            min-width="400"
            min-height="400"
            max-height="400">
        <v-img
                class="white--text align-end pointer"
                height="200px"
                :src="project.src"
                @click="redirectToProject(project)"
        >
        </v-img>
        <v-card-title>{{project.name}}</v-card-title>

        <v-card-subtitle class="pb-0">{{'12.3.2020'}}</v-card-subtitle>

        <v-card-text class="text--primary project-description">
            <div>{{project.description}}</div>
        </v-card-text>

        <v-progress-linear
                v-model="progress"
                color="#7cb342"
                striped
                height="15"
        >
            <template v-slot="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
            </template>
        </v-progress-linear>

        <v-card-actions class="mt-2">
            <v-btn
                    outlined small
                    color="#1E1E1E"
                    text>
                <v-icon class="mr-2">payment</v-icon>
                Contribute
            </v-btn>

            <v-btn
                    outlined small
                    color="#1E1E1E"
                    text
                    @click="redirectToProject(project)">
                <v-icon class="mr-2">more_horiz</v-icon>
                Read more
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
    async created () {
      this.progress = await this.getProjectStatus(this.project.id);
    },
    methods: {
      redirectToProject (project) {
        this.$router.push('project/' + project.id)
      },
      async getProjectStatus (projectId) {
        let status = await this.$blockchain.getActualProjectStatus(projectId);
        return status[0].toFixed() / status[1].toFixed() * 100;
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
