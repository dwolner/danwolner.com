<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header style="overflow: visible;">
      <q-toolbar
        id="top"
        align="center"
        class="bg-grey-7"
        style="overflow: visible; background: #313638 !important; padding: 0;"
      >
          <!-- <q-btn
              flat
              aria-label="Menu"
              style="opacity: 0;"
          >
              <q-icon name="fas fa-bars" color="white" style="font-size: 1.5rem;" />
          </q-btn> -->
        <q-toolbar-title style="max-height: 50px; overflow: visible">
            <q-btn
                round
                size="xl"
                class="bg-grey-7"
                inverted
                :style="`font-size: 2rem; overflow: visible; background: #F1863E !important; opacity: ${scrollPosition < scrollLimit ? '0' : '1'}`"
            >
                <img align="center" src="statics/media/DW_logo.png" style="max-height: 70px;">
            </q-btn>
        </q-toolbar-title>

        <!-- <q-btn
            flat
            @click="showMenuModal = !showMenuModal"
            aria-label="Menu"
        >
            <q-icon name="fas fa-bars" color="white" style="font-size: 1.5rem;" />
        </q-btn> -->

      </q-toolbar>
    </q-layout-header>

    <q-modal
      v-model="showMenuModal"
      :content-css="{ minWidth: '100vw', minHeight: '100vh', background: 'rgba(255, 255, 255, .8)'}"
    >
        <q-modal-layout>
            <q-toolbar slot="header" style="background: rgba(0,0,0,0) !important; padding: 1rem;">
                <!-- <img align="center" alt="Meanwhile logo" src="statics/media/MEANWHILE-GLITCH-slower_edit.gif" style="max-height: 150px; margin: -2rem;"> -->

                <q-toolbar-title>
                </q-toolbar-title>

                <q-btn flat @click="showMenuModal = false">
                    <q-icon name="fas fa-times" color="black" style="font-size: 1.5rem;" />
                </q-btn>
            </q-toolbar>

            <div>
                <!-- <img align="center" alt="Meanwhile logo" src="statics/media/MEANWHILE-GLITCH-slower_edit.gif" style="max-height: 100px; margin: -1.5rem;"> -->

                <q-list
                    no-border
                >
                    <q-item class="justify-center">
                        <q-btn flat inverted v-ripple class="full-width" @click="$router.push('/'), showMenuModal = false">
                            <h4 style="margin: .25rem 0; text-transform: uppercase;">Home</h4>
                        </q-btn>
                    </q-item>
                    <q-item class="justify-center">
                        <q-btn flat inverted v-ripple class="full-width" @click="$router.push('/about'), showMenuModal = false">
                            <h4 style="margin: .25rem 0; text-transform: uppercase;">About</h4>
                        </q-btn>
                    </q-item>
                    <q-item class="justify-center">
                        <q-btn flat inverted v-ripple class="full-width" @click="$router.push('/contact'), showMenuModal = false">
                            <h4 style="margin: .25rem 0; text-transform: uppercase;">Contact</h4>
                        </q-btn>
                    </q-item>
                    <!-- <q-item class="justify-center" >
                        <q-btn flat inverted v-ripple class="full-width" @click="scrollTo(''), showMenuModal = false">
                            <h4 style="margin: .25rem 0; text-transform: uppercase;">Video</h4>
                        </q-btn>
                    </q-item>
                    <q-item class="justify-center">
                        <q-btn flat inverted v-ripple class="full-width" @click="scrollTo(''), showMenuModal = false">
                            <h4 style="margin: .25rem 0; text-transform: uppercase;">Design</h4>
                        </q-btn>
                    </q-item> -->
                    <q-item class="justify-center">
                        <q-btn flat inverted v-ripple class="full-width" @click="$router.push('/store'), showMenuModal = false">
                            <h4 style="margin: .25rem 0; text-transform: uppercase;">Store</h4>
                        </q-btn>
                    </q-item>
                </q-list>
            </div>

            <div slot="footer" :align="windowWidth < 768 ? 'center' : 'right'" style="padding: 2rem; background: rgba(255, 255, 255, .7);">
                <SocialMedia />
            </div>
        </q-modal-layout>
    </q-modal>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import SocialMedia from '../components/SocialMedia'

export default {
    name: 'MyLayout',

    components: {
        SocialMedia,
    },

    data() {
        return {
            showMenuModal: false,
        }
    },

    computed: {
        windowWidth() {
            return this.$store.state.windowWidth
        },

        scrollPosition() {
            return this.$store.state.scrollPosition
        },

        scrollLimit() {
            return this.windowWidth < 992 ? '350' : this.windowWidth < 1200 ? '450' : '550'
        }
    },

    methods: {
        openURL,
        scrollTo(hash) {
            this.scrollIt(hash, '', 50)
        },
        scrollTop() {
            window.scrollTo(0, 0)
        },
    },
}
</script>

<style>
.q-layout-header {
    -webkit-box-shadow: none;
    box-shadow: none;
}
</style>
