<template>
    <v-list three-line>
        <template v-for="(contribution, index) in contributions">
            <v-divider
                       :key="index"
            ></v-divider>
            <v-list-item
                         :key="index"
            >
                <v-list-item-content>
                    <v-list-item-title
                                       v-html="contribution.sum + ' ETH to ' +contribution.project.name"></v-list-item-title>
                    <v-list-item-subtitle
                                          v-html="'by ' + getAuthor(contribution.doneBy) + ' on ' + moment(contribution.transactiondate).format('DD.MM.YYYY [at] hh:mm')"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>
</template>

<script>
  export default {
    name: "TransactionsListBlack",
    props: ['contributions'],
    data: () => ({}),
    methods: {
      getAuthor (authorData) {
        return authorData != null ? authorData.login : "Anonymous"
      }
    }
  }
</script>

<style scoped>

</style>
