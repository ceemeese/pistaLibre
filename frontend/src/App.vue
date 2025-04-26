<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'
import Footer from './components/AppFooter.vue'



</script>

<template>
  <v-app class="d-flex flex-column min-h-screen">
    <Header />

    <v-main class="flex-grow-1 d-flex flex-column fill-height">
      <RouterView />
    </v-main>

    <Footer class="shrink-0"/>
    
  </v-app>
</template>

<style scoped>

</style>
