<template>
    <v-content>
        <carousel/>
            <v-container fluid>
                <v-row>
                    <v-col cols="12" sm="3" md="4"
                           v-for="project of projects"
                           :key="project.id">
                        <project-card-component :project="project"/>
                    </v-col>
                </v-row>
            </v-container>
    </v-content>
</template>

<script>
  import Carousel from './CarouselComponent'
  import ProjectCardComponent from '../ProjectCardComponent'
  import ProjectService from '../../services/project-service'

  export default {
    name: 'Home',
    components: {ProjectCardComponent, Carousel},
    data: () => ({
      projects: {}
    }),
    mounted () {
      ProjectService.getAllProjects()
        .then((result) => {
          this.projects = result.data
        })
    }
  }
</script>
