<template>
    <v-carousel
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            :cycle="true"
            :progress="true"
            :progress-color="'#fff'"
    >
        <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
                :src=slide.src
        >
                <v-row>
                    <div class="display-3 white--text text-left background-opacity carousel-text-container">{{ slide.label }}</div>
                </v-row>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
  export default {
    name: 'Carousel',

    data: () => ({
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
      ],
      slides: [
        {
          label: 'First',
          src: 'https://images.unsplash.com/photo-1574607383363-5b5f1747b37b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80'
        }, {
          label: 'Second',
          src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        }, {
          label: 'Third',
          src: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80'
        }

      ],
    })
  }
</script>

<style scoped>
</style>
