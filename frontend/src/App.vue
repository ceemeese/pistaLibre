<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'
import Banner from './components/AppBanner.vue'


</script>

<template>
  <v-app>
    <Header />
    <Banner />
    <RouterView />
  </v-app>
</template>

<style scoped>

</style>
