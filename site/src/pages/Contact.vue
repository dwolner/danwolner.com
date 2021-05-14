<template>
  <q-page class="">

     <div class="row" align="center" style="padding: 2rem; max-width: 640px; margin: 0 auto;">
         <div class="col-12"><h4 class="text-white">Contact us</h4></div>
         <div class="col-6" style="padding: .5rem;">
             <q-btn class="full-width" color="white" outline @click="selectForm('partner')">
                 <h6 class="text-white" style="margin: 1rem;">Partner</h6>
             </q-btn>
         </div>
         <div class="col-6" style="padding: .5rem;">
             <q-btn class="full-width" color="white" outline @click="selectForm('client')">
                 <h6 class="text-white" style="margin: 1rem;">Client</h6>
             </q-btn>
         </div>
     </div>

     <div class="col-12">
         <iframe :src="formSrc" width="640" height="1163" frameborder="0" style="margin: 0 auto; width: 100%;">Loading...</iframe>
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
  name: "Contact",

  props: [""],

  components: {
      SocialMedia
  },

  data() {
    return {
        formSelection: 'partner',
        forms: {
            partner: 'https://docs.google.com/forms/d/e/1FAIpQLSdIPjhC9PncBHmwA-A1vNN30Li3wodK03LI3nlCNg3WmC4ZuQ/viewform?embedded=true',
            client: 'https://docs.google.com/forms/d/e/1FAIpQLSftnwFGIXn2wGHOaINSvUuzbmvmffB23nlewuuTOlV17RZOgg/viewform?embedded=true'
        }
    };
  },

  computed: {
      formSrc() {
          return this.forms[this.formSelection]
      }
  },

  methods: {
      selectForm(id) {
          this.formSelection = id
      }
  },

  watch: {

  },

  created() {

  }
};
</script>
