<template>
  <q-page class="">

     <div align="center" style="padding: 2rem;">
         <div class="relative-position" style="max-width: 1100px;">
             <img align="center" alt="Meanwhile logo" src="statics/media/MEANWHILE - Cream.png" style="opacity: .1; max-width: 300px; position: absolute; top: 50%; left: 50%; transform: translateY(-50%) translateX(-50%);">

             <h6 class="text-white" style="margin: 5rem 0;">
                 MEANWHILE is a Film, Commercial and Music Video company -- creating content with cinematic, colorful storytelling. Brian Lipko & Kyle P. Nolan (Creative Director and Managing Producer respectively) perfect each aspect in-house -- valuing originality, integrity, passion, excellence and execution.
             </h6>
         </div>
     </div>

     <div align="center" style="padding: 2rem;">
         <SocialMedia />
     </div>
  </q-page>
</template>

<style>

</style>

<script>
import SocialMedia from '../components/SocialMedia';

export default {
  name: "About",

  props: [""],

  components: {
      SocialMedia
  },

  data() {
    return {

    };
  },

  computed: {

  },

  methods: {

  },

  watch: {

  },

  created() {

  }
};
</script>
