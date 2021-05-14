<template>
  <div id="q-app">
      <q-window-resize-observable @resize="onResize" />
    <router-view />
  </div>
</template>

<script>
export default {
    name: 'App',

    methods: {
        onResize(size) {
            this.$store.commit('windowWidth', size.width)
            // this.$store.commit('windowHeight', size.height)
        }
    },

    created() {
        this.$store.commit('windowWidth', window.innerWidth)
        // this.$store.commit('windowHeight', window.innerHeight)
    }
}
</script>

<style>
</style>
