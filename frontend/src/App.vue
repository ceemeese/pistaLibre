<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/AppHeader.vue'



</script>

<template>
  <v-app>
    <Header />

    <v-main>
      <RouterView />
    </v-main>
    
  </v-app>
</template>

<style scoped>

</style>
