<template>
    <v-container fluid class="overlay-container">
        <loading v-if="loading" :text="'Please complete Transaction'"/>
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
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                                color="black"
                                type="number"
                                light
                                suffix="ETH"
                                @blur="convertDecimalAndGetEuro()"
                                label="Target Sum"
                                v-model="targetSum"/>
                    </v-col>
                </v-row>
                <div v-if="targetSum" class="pb-3">
                    Target Sum in eur: {{(targetSum * etherPrice).toFixed(2)}} €
                </div>
                <v-row class="justify-center pb-3">
                    <vue-dropzone
                            ref="imgDropZone"
                            id="customdropzone"
                            :options="dropzoneOptions"
                            @vdropzone-complete="afterComplete"
                    ></vue-dropzone>
                    <div v-if="images.length > 0" class="image-div">
                        <div v-for="image in images" :key="image.src">
                            <img :src="image.src" class="image"/>
                        </div>
                    </div>
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
  import AuthenticationService from '../../services/authentication-service'
  import firebase from 'firebase'
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'
  import CoinPriceService from '../../services/coin-price-service'

  let uuid = require('uuid')

  export default {
    name: 'AddProjectComponent',
    components: {Loading, vueDropzone: vue2Dropzone},
    data: () => ({
      projectData: {
        name: '',
        description: '',
        src: '',
        createdBy: Number
      },
      snackBar: {
        show: false,
        message: '',
        color: ''
      },
      targetSum: 0,
      etherPrice: '',
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
      snackbarMessage: '',
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        thumbnailHeight: 150,
        addRemoveLinks: false,
        acceptedFiles: '.jpg, .jpeg, .png',
        dictDefaultMessage: `<p class='text-default'><i class='fa fa-cloud-upload mr-2'></i> Drag Images or Click Here</p>
          <p class="form-text">Allowed Files: .jpg, .jpeg, .png</p>`,
      },
      images: []
    }),
    mounted () {
      this.projectData.createdBy = AuthenticationService.getUser().id
      CoinPriceService.getEtherPrice().then(res => {
        this.etherPrice = res.data.EUR
      })
    },
    methods: {
      createProject () {
        if (this.validate()) {
          this.loading = true
          ProjectService.createNewProject(this.projectData)
            .then(response => {
              this.$blockchain.addNewProject(response.data.id, this.targetSum).then(() => {
                  this.loading = false
                  this.redirect('/project/' + response.data.id)
                }
              )
            })
        }
      },
      redirect (path) {
        this.$router.replace({path: path})
      },
      message (msg, color) {
        this.snackBar.show = true
        this.snackBar.message = msg
        this.snackBar.color = color
      },
      validate () {
        return this.$refs.form.validate()
      },
      afterComplete (image) {
        let imageName = uuid.v1()
        if (image) {
          let storageRef = firebase.storage().ref()
          let imageRef = storageRef.child(`images/${imageName}.png`)
          imageRef.put(image, {
            contentType: 'image/png'
          })
            .then(() => {
              imageRef.getDownloadURL().then(res => {
                  this.projectData.src = res
                }
              )
            })
        }
      },
      convertDecimalAndGetEuro () {
        this.targetSum = this.targetSum | 0;
      }
    }
  }
</script>

<style scoped>

</style>
