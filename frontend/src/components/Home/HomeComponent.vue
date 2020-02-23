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
  import vars from '../../dev-env-variables'
  import ProjectCardComponent from '../ProjectCardComponent'

  export default {
    name: 'Home',
    components: {ProjectCardComponent, Carousel},
    data: () => ({
      projects: {}
    }),
    mounted () {
      this.$http.get(vars.baseURI + '/projects')
        .then((result) => {
          this.projects = result.data
        })
    }
  }
</script>
