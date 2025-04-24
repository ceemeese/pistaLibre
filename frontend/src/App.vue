<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'
import Footer from './components/AppFooter.vue'



</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <RouterView />
    </v-main>

    <Footer />
    
  </v-app>
</template>

<style scoped>

</style>
