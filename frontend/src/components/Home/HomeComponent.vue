<template>
    <v-content>
        <carousel/>
            <v-container fluid>
                <v-row>
                    <v-col cols="12" sm="4" md="3" lg="3"
                           v-for="project of projects"
                           :key="project.id">
                        <project-card-component :project="project"/>
                    </v-col>
                </v-row>
                <div class="text-center">
                    <v-pagination
                            v-model="page"
                            :length="numberOfPages"
                            circle
                    ></v-pagination>
                </div>
            </v-container>
    </v-content>
</template>

<script>
  import Carousel from './CarouselComponent'
  import ProjectCardComponent from './ProjectCardComponent'
  import ProjectService from '../../services/project-service'

  export default {
    name: 'HomeComponent',
    components: {ProjectCardComponent, Carousel},
    data: () => ({
      projects: {},
      page: 1,
      numberOfPages: 1
    }),
    mounted () {
      ProjectService.getAllProjects()
        .then((result) => {
          this.projects = result.data
          this.numberOfPages = Math.round(this.projects.length / 8)
        })
    }
  }
</script>
