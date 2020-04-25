<template>
    <v-carousel
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            :cycle="true"
            :progress="true"
            :progress-color="'#fff'"
    >
        <v-carousel-item
                src="https://images.unsplash.com/photo-1574607383363-5b5f1747b37b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80">
            <div class="background-opacity">
                <v-row class="pt-10">
                    <div class="display-3 white--text carousel-text-container">
                        <div class="mt-3">Welcome to the Crowdfunding portal</div>
                    </div>
                </v-row>
                <v-row class="mt-0">
                    <div class="display-1 white--text carousel-text-container">
                        <div class="mt-3">Diploma thesis project designed and developed by Samuel Šušoliak</div>
                    </div>
                </v-row>
            </div>
        </v-carousel-item>
        <v-carousel-item
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80">
            <div class="background-opacity">
                <v-row class="pt-10">
                    <div class="display-3 white--text carousel-text-container">
                        <div class="mt-3">Share your project or idea</div>
                    </div>
                </v-row>
                <v-row class="mt-0">
                    <div class="display-1 white--text carousel-text-container">
                        <v-btn outlined large @click="redirect('register')">
                            Register now
                        </v-btn>
                    </div>
                </v-row>
            </div>
        </v-carousel-item>
        <v-carousel-item
                src="https://images.unsplash.com/photo-1484100356142-db6ab6244067?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80"
                class="fill-height">
            <div class="background-opacity">
                <v-row class="pt-5">
                    <div class="display-3 white--text carousel-text-container">
                        <div class="mt-3">Latest Contributions</div>
                    </div>
                    <v-card class="mx-auto"
                            style="overflow-y: scroll"
                            max-width="900"
                            min-width="900"
                            max-height="450"
                            min-height="450">
                        <transactions-list :contributions="contributions"/>
                    </v-card>
                </v-row>
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
  import ProjectService from '../../services/project-service'
  import TransactionsList from '../TransactionsList'

  export default {
    name: 'Carousel',
    components: {TransactionsList},
    mounted () {
      ProjectService.getAllContributions().then((res) => {
        this.contributions = res.data;
      })
    },
    data: () => ({
      contributions: {},
      items: [
        {header: 'Today'},
        {
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {divider: true, inset: true},
        {
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        {divider: true, inset: true},
        {
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
        {divider: true, inset: true},
        {
          title: 'Birthday gift',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
        },
        {divider: true, inset: true},
        {
          title: 'Recipe to try',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        },
      ],
    }),
    methods: {
      redirect (path) {
        this.$router.push({path: path})
      },
    }
  }
</script>

<style scoped>
</style>
