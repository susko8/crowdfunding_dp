<template>
    <v-list three-line>
        <template v-for="(contribution, index) in contributions">
            <v-divider class="white--text"
                       :key="index"
            ></v-divider>
            <v-list-item class="white--text"
                         :key="contribution.id"
            >
                <v-list-item-content>
                    <v-list-item-title class="white--text"
                                       v-html="contribution.sum + ' ETH to ' +contribution.project.name"></v-list-item-title>
                    <v-list-item-subtitle class="white--text"
                                          v-html="'by ' + getAuthor(contribution.doneBy) + ' on ' + moment(contribution.transactiondate).format('DD.MM.YYYY [at] hh:mm')"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>
</template>

<script>
  export default {
    name: "TransactionsList",
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
