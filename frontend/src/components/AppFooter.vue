<template>
    <v-footer class="text-center d-flex flex-column ga-2 py-2 py-md-4 mt-5 mt-md-10 shrink-0 flex-0-0-auto" color="black">
        
        <div class="d-flex ga-3 justify-center">
            <v-btn
            v-for="icon in icons"
            :key="icon"
            :icon="icon"
            density="comfortable"
            variant="text"
            ></v-btn>
        </div>
    
        <v-divider class="my-1 mx-auto" thickness="2" width="50"></v-divider>
    
        <div class="text-caption font-weight-regular opacity-60">
            Juega más, reserva mejor. Tu pista, siempre lista.
        </div>
    
        <v-divider class="my-2" color="white"></v-divider>
    
        <div>
            {{ new Date().getFullYear() }} — <strong>PistaLibreApp</strong>
        </div>
        
    </v-footer>
  </template>

<script setup lang="ts">

  const icons = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
  ]

</script>

<style scoped>

</style>