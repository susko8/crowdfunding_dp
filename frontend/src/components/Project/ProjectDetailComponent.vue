<template>
    <v-container>
        <v-card class="mx-auto pointer pt-1 mt-2"
                :class="{ completed: completed }">

            <v-row>
                <v-col lg="6" sm="12">
                    <v-img
                            class="white--text align-end ma-8"
                            style="position: relative"
                            :src="project.src"
                            aspect-ratio="1"
                    >
                        <category-chip-component :category="project.category"/>
                    </v-img>
                </v-col>
                <v-col lg="6" sm="12" class="mt-2">
                    <v-card-title class="display-3">{{project.name}}</v-card-title>

                    <v-card-subtitle class="text-right mr-12 pb-0">{{'12.3.2020'}}</v-card-subtitle>
                    <v-card-subtitle class="text-right mr-12 pt-0">Created By: {{project.createdBy}}</v-card-subtitle>

                    <v-card-text class="text--primary subtitle-1 project-description">
                        <div>{{project.description}}</div>
                    </v-card-text>
                    <v-card-text class="text--primary subtitle-1 project-description">
                        <div>Category: {{project.category}}</div>
                    </v-card-text>
                    <v-card-text class="text--primary project-description subtitle-1 pb-2">
                        Contributions:
                    </v-card-text>
                    <v-card-subtitle v-if="!completed" class="text-center pb-2 pt-0">Contributed: {{actual + ' ETH of - ' + target + ' ETH'}}</v-card-subtitle>
                    <v-card-subtitle v-if="completed" class="text-center pb-2 pt-0">Funding completed : {{actual + ' ETH'}}</v-card-subtitle>
                    <div class="progress-bar">
                        <v-progress-linear
                                :value="progress"
                                color="#4b830d"
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
                    <v-card class="mx-auto"
                            style="overflow-y: scroll"
                            min-width="200"
                            max-height="450"
                            min-height="450">
                        <transactions-list-black :contributions="contributions"/>
                    </v-card>
                </v-col>
            </v-row>
            <v-card-actions class="justify-end">
                <v-btn v-if="user != null && user.userRole === 'ADMIN'"
                        outlined large
                        color="#1E1E1E"
                        text
                >
                    <v-icon class="mr-2">delete</v-icon>
                    Delete
                </v-btn>
                <v-btn
                        v-if="user != null && user.userRole === 'ADMIN'"
                        outlined large
                        color="#1E1E1E"
                        text
                >
                    <v-icon class="mr-2">edit</v-icon>
                    Edit
                </v-btn>
                <v-btn
                        outlined large
                        color="#1E1E1E"
                        text
                        @click="contributionDialog = true"
                        v-if="!completed"
                >
                    <v-icon class="mr-2">payment</v-icon>
                    Contribute
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="mt-5">
            <v-card-title class="title">Comments</v-card-title>
            <disqus-component class="ma-5" :projectId=project.id></disqus-component>
        </v-card>
        <v-dialog v-model="contributionDialog" width="600px" style="overflow-x: hidden !important;">
            <v-card v-if="loading">
                <loading v-if="loading" :text="'Please complete Transaction'"/>
            </v-card>
            <v-card v-if="!loading"
                    style="overflow-x: hidden !important;">
                <v-card-title>
                    <span class="subtitle-1">Make a contribution to "{{project.name}}"</span>
                </v-card-title>
                <v-row class="justify-center">
                    <v-col cols="6">
                        <v-text-field
                                color="black"
                                type="number"
                                light
                                suffix="ETH"
                                @blur="convertDecimalAndGetEuro()"
                                label="Target Sum"
                                v-model="contributionSum"/>
                    </v-col>
                </v-row>
                <div class="pb-3 text-center">
                    Target Sum in eur: {{(contributionSum * etherPrice).toFixed(2)}} €
                </div>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="contributionDialog = false">Close</v-btn>
                    <v-btn color="green darken-1" text @click="contributeToProject()">Contribute</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
  import ProjectService from '../../services/project-service'
  import DisqusComponent from './DisqusComponent'
  import CoinPriceService from '../../services/coin-price-service'
  import Loading from '../Common/Loading'
  import TransactionsListBlack from '../TransactionListBlack'
  import AuthenticationService from '../../services/authentication-service'
  import CategoryChipComponent from '../Project/CategoryChipComponent'

  export default {
    name: 'ProjectDetailComponent',
    components: {TransactionsListBlack, DisqusComponent, Loading, CategoryChipComponent},
    async mounted () {
      ProjectService.getOneProject(this.$route.params.id)
        .then((res) => {
          this.project = res.data
          this.getProjectStatus(this.project.id).then(status => {
            this.actual = status[0].toFixed(2) / 100;
            this.target = status[1].toFixed(2) / 100;
            this.progress = status[0].toFixed() / status[1].toFixed() * 100;
          })
        })
      CoinPriceService.getEtherPrice().then(res => {
        this.etherPrice = res.data.EUR
      })
      ProjectService.getContributionsForProject(this.$route.params.id).then((res) => {
        this.contributions = res.data;
      })
    },
    computed: {
      user: () => AuthenticationService.getUser()
    },
    data: () => ({
      project: {},
      progress: -1,
      actual: -1,
      target: -1,
      contributionDialog: false,
      etherPrice: 0,
      contributionSum: 0,
      euro: 0,
      loading: false,
      completed: false,
      contributions: {}
    }),
    methods: {
      async getProjectStatus (projectId) {
        return await this.$blockchain.getActualProjectStatus(projectId).then(status =>
        {
          this.actual = status[0].toFixed(2) / 100;
          this.target = status[1].toFixed(2) / 100;
          this.progress = status[0].toFixed() / status[1].toFixed() * 100;
          if (this.progress > 100) {
            this.progress = 100;
            this.completed = true;
          }
        });
      },
      async contributeToProject () {
        this.loading = true
        const contributionData = {
          userLogin: AuthenticationService.getUserLogin(),
          sum: this.contributionSum
        }
        this.$blockchain.contributeToProject(this.project.id, this.contributionSum).then(async () => {
          await this.getProjectStatus(this.project.id).then(() => {
            ProjectService.recordContribution(this.project.id, contributionData).then(() => {
              ProjectService.getContributionsForProject(this.$route.params.id).then((res) => {
                this.contributions = res.data;
                this.contributionDialog = false
                this.loading = false
              })
            })
          })
          })
      },
      convertDecimalAndGetEuro () {
        this.euro = this.contributionSum | 0;
      }
    }
  }
</script>

<style scoped>
.progress-bar{
    width: 75%;
    margin: auto;
}
</style>
