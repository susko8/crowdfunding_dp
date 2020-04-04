<template>
    <v-container>
        <v-card class="mx-auto pointer pt-1 mt-2">

            <v-row>
                <v-col lg="6" sm="12">
                    <v-img
                            class="white--text align-end ma-8"
                            :src="project.src"
                            aspect-ratio="1"
                    >
                    </v-img>
                </v-col>
                <v-col lg="6" sm="12" class="mt-2">
                    <v-card-title class="display-3">{{project.name}}</v-card-title>

                    <v-card-subtitle class="text-right mr-12">{{'12.3.2020'}}</v-card-subtitle>

                    <v-card-text class="text--primary subtitle-1 project-description">
                        <div>{{project.description}}</div>
                    </v-card-text>
                    <v-card-text class="text--primary project-description subtitle-1    ">
                        <div>Contributions:</div>
                    </v-card-text>
                    <div class="progress-bar">
                        <v-progress-linear
                                color="grey accent-4"
                                striped
                                height="15"
                        >
                            <template v-slot="{ value }">
                                <strong>{{ Math.ceil(value) }}%</strong>
                            </template>
                        </v-progress-linear>
                    </div>
                    <v-card-text class="text--primary project-description subtitle-1 mt-5">
                        <div>Latest transactions:</div>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
        <v-card class="mt-5">
            <v-card-title class="title">Comments</v-card-title>
            <disqus-component class="ma-5" :projectId=project.id></disqus-component>
        </v-card>
    </v-container>
</template>

<script>
  import ProjectService from '../../services/project-service'
  import DisqusComponent from './DisqusComponent'

  export default {
    name: 'ProjectDetailComponent',
    components: {DisqusComponent},
    mounted () {
      ProjectService.getOneProject(this.$route.params.id)
        .then((res) => {
          this.project = res.data
        })
    },
    data: () => ({
      project: {}
    })
  }
</script>

<style scoped>
.progress-bar{
    width: 75%;
    margin: auto;
}
</style>
