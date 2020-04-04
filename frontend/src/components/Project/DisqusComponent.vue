<template>
    <div class="comments">
        <vue-disqus v-if="projectId" shortname="peter" :identifier="'disqus'+projectId"
                    :url="'http://localhost:4200/public/project/'+projectId"></vue-disqus>
    </div>
</template>

<script>
  export default {
    name: 'DisqusComponent',
    props: ['projectId']
  }
</script>

<style scoped>

</style>
