<template>
    <div>
        <!-- <h6 class="text-white" style="margin: 0;">Follow</h6> -->
        <q-btn v-for="link in links" flat style="padding: .5rem;" @click="goto(link.link)">
            <q-icon :color="link.color" :name="link.icon" style="font-size: 1.5rem;" />
        </q-btn>
    </div>
</template>

<style>

</style>

<script>
export default {
  name: "SocialMedia",

  props: ["urlTag"],

  data() {
    return {
        links: [{
            icon: 'fas fa-envelope',
            link: 'mailto:daniel.wolner@gmail.com',
            color: 'grey-9'
        }, {
            icon: 'fab fa-facebook-f',
            link: 'https://www.facebook.com/dannoschmanno/',
            color: 'blue-9'
        }, {
            icon: 'fab fa-youtube',
            link: 'https://www.youtube.com/c/danwolnerisme',
            color: 'red-6'
        }, {
            icon: 'fab fa-instagram',
            link: 'https://www.instagram.com/dannoschmanno/',
            color: 'purple-4'
        }, {
            icon: 'fab fa-twitter',
            link: 'https://twitter.com/danwolner',
            color: 'blue-4'
        // }, {
        //     icon: 'fab fa-facebook',
        //     link: ''
        }]
    };
  },

  computed: {

  },

  methods: {
      goto(link) {
          console.log('goto: ', link)
          window.open(link, '_blank')
      }
  },

  watch: {

  },

  created() {

  }
};
</script>
