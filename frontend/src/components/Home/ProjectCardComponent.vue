<template>
    <v-card class="mx-auto"
            max-width="400"
            min-width="250"
            min-height="420"
            max-height="420"
            :class="{ completed: completed }">
        <v-img
                class="white--text align-end pointer"
                height="200px"
                :src="project.src"
                @click="redirectToProject(project)"
        >
        </v-img>
        <v-card-title>{{project.name}}</v-card-title>

        <v-card-subtitle class="pb-0">{{'12.3.2020'}}</v-card-subtitle>

        <v-card-text class="text--primary project-description pb-0 mb-0">
            <div>{{project.description}}</div>
        </v-card-text>

        <v-card-subtitle v-if="!completed" class="pb-2 pt-0 text-center">Contributed: {{actual + ' ETH of - ' + target + ' ETH'}}</v-card-subtitle>
        <v-card-subtitle v-if="completed" class="pb-3 pt-0 text-center">Funding completed : {{actual + ' ETH'}}</v-card-subtitle>

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
                    v-if="!completed"
                    outlined small
                    color="#1E1E1E"
                    text
                    @click="contributionDialog = true"
            >
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
    </v-card>
</template>

<script>
  import CoinPriceService from '../../services/coin-price-service'
  import Loading from '../Common/Loading'

  export default {
    name: 'ProjectCardComponent',
    props: ['project'],
    components: {Loading},
    data () {
      return {
        progress: -1,
        actual: -1,
        target: -1,
        contributionDialog: false,
        etherPrice: 0,
        contributionSum: 0,
        loading: false,
        completed: false
      }
    },
    async created () {
      await this.getProjectStatus(this.project.id);
      CoinPriceService.getEtherPrice().then(res => {
        this.etherPrice = res.data.EUR
      })
    },
    methods: {
      redirectToProject (project) {
        this.$router.push('project/' + project.id)
      },
      async getProjectStatus (projectId) {
        let status = await this.$blockchain.getActualProjectStatus(projectId);
        this.actual = await status[0].toFixed(2) / 100
        this.target = await status[1].toFixed(2) / 100
        this.progress = await status[0].toFixed() / status[1].toFixed() * 100;
        if (this.progress > 100) {
          this.progress = 100;
          this.completed = true;
        }
      },
      async contributeToProject () {
        this.loading = true
        this.$blockchain.contributeToProject(this.project.id, this.contributionSum).then(async () => {
          await this.getProjectStatus(this.project.id).then(() => {
            this.contributionDialog = false
            this.loading = false
          })
        })
      },
      convertDecimalAndGetEuro () {
        this.targetSum = this.targetSum | 0;
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
