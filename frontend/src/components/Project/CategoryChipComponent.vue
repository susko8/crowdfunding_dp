<template>
    <v-chip :color="colors[category]" class="chip-position" text-color="white">{{category.slice(0,1) + category.slice(1).toLowerCase()}}
        <v-icon right>{{icons[category]}}</v-icon></v-chip>
</template>

<script>
  export default {
    name: "CategoryChipComponent",
    props: ['category'],
    data: () => {
    return {
      icons:{
        PRODUCT:'emoji_objects',
        HEALTH:'favorite',
        COMMUNITY:'local_library'
      },
      colors:{
        PRODUCT:'#303F9F',
        HEALTH:'#C62828',
        COMMUNITY:'#AFB42B'
      }
    }
  }
  }
</script>

<style scoped>
    .chip-position {
        position: absolute;
        top: 3px;
        right: 3px;
    }
</style>
