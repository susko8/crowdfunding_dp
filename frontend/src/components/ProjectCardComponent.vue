<template>
    <v-card class="mx-auto"
            max-width="400">
        <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
        </v-img>
        <v-card-title>{{project.projectName}}</v-card-title>

        <!--                    <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>-->

        <!--                    <v-card-text class="text&#45;&#45;primary">-->
        <!--                        <div>Whitehaven Beach</div>-->

        <!--                        <div>Whitsunday Island, Whitsunday Islands</div>-->
        <!--                    </v-card-text>-->

        <v-card-actions>
            <v-btn
                    color="orange"
                    text>
                Share
            </v-btn>

            <v-btn
                    color="orange"
                    text>
                Explore
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  export default {
    name: 'ProjectCardComponent',
    props: ['project']
  }
</script>

<style scoped>

</style>
