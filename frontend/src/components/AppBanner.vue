<template>
    <div class="banner-wrapper">
      <v-img
        :src="bannerImage"
        height="400px"
        cover
        class="banner-img"
      >
        <!-- Gradiente + contenido encima -->
        <div class="banner-overlay d-flex flex-column justify-center align-center text-center px-4">
          <!--<h1 class="text-h4 text-white font-weight-bold">Bienvenido a PistaLibreApp</h1>
          <p class="text-subtitle-1 text-white">Reserva tus pistas de forma rápida y sencilla</p>-->
        </div>
      </v-img>
    </div>
  </template>
  
  <script setup lang="ts">
    const bannerImage = new URL('@/assets/banner.png', import.meta.url).href
  </script>
  
  <style scoped>
  .banner-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  
  .banner-img {
    position: relative;
  }
  
  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  </style>
  