<template>
    <v-content>
        <carousel/>
            <v-container fluid>
            </v-container>
    </v-content>
</template>

<script>
  import Carousel from './CarouselComponent'

  export default {
    name: 'Home',
    components: {Carousel},
    data: () => ({
    }),
  }
</script>
