<template>
    <v-container fluid class="overlay-container">
        <loading v-if="loading"/>
        <div v-else>
            <v-form
                    ref="form"
                    v-model="valid">
                <h3 class="text-center pa-3">Create New Project</h3>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                color="black"
                                light
                                v-model="projectData.name"
                                :rules="nameRules"
                                label="Project Name"/>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea
                                color="black"
                                light
                                :rules="descriptionRules"
                                label="Provide description"
                                v-model="projectData.description"/>
                    </v-col>
                </v-row>
                <v-row class="text-center">
                    <v-btn
                            class="margin-auto"
                            large
                            @click="createProject()"
                    >Create Project
                    </v-btn>
                </v-row>
            </v-form>
        </div>
        <v-snackbar
                v-model="snackBar.show"
                :color="snackBar.color"
        > {{snackBar.message}}
            <v-btn
                    color="white"
                    text
            > Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
  import ProjectService from '../../services/project-service'
  import Loading from '../Common/Loading'

  export default {
    name: 'AddProjectComponent',
    components: {Loading},
    data: () => ({
      projectData: {
        name: '',
        description: '',
        src: '',
      },
      snackBar: {
        show: false,
        message: '',
        color: ''
      },
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Project name must be less than 30 characters',
        v => (v && v.length >= 4) || 'Project name must be more than 4 characters',
      ],
      descriptionRules: [
        v => !!v || 'Field is Required'
      ],
      loading: false,
      showSnackbar: false,
      snackbarMessage: ''
    }),
    methods: {
      createProject () {
        if (this.validate()) {
          this.loading = true
          ProjectService.createNewProject(this.projectData)
            .then(response => {
              if (response.data === true) {
                this.loading = false
                //this.$router.push('home')
              }
            })
        }
      },
      message (msg, color) {
        this.snackBar.show = true
        this.snackBar.message = msg
        this.snackBar.color = color
      },
      validate () {
        return this.$refs.form.validate()
      },
    }
  }
</script>

<style scoped>

</style>
