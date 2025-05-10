<template>
    <div class="banner-wrapper">
      <v-parallax
        :src="bannerImage"
        cover
        class="banner-img"
      >
        <div class="banner-overlay d-flex flex-column justify-center align-center text-center px-4">
          <h1 class="text-h4 text-md-h2 text-lg-h1 text-white font-weight-bold">Pista Libre</h1>
          <p class="text-body-1 text-md-subtitle-1 text-lg-h5 text-white"> {{ t("subtitle") }}</p>
          <v-btn @click="emit('scrollToDatepicker')" class="elevation-4 rounded-xl mt-6" color="black">
            {{ t("reservation") }}
          </v-btn>
        </div>
      </v-parallax>
    </div>
  </template>
  
  <script setup lang="ts">
 
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n() 
    const bannerImage = new URL('@/assets/banner2.png', import.meta.url).href

    const emit = defineEmits<{
      (e: 'scrollToDatepicker'): void;
    }>();

  </script>
  
  <style scoped>
  .banner-wrapper {
    width: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  
  .banner-img {
    height: 100vh;
  }
  
  .banner-overlay {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding: 0 10px;
  }

  @media (min-width: 1024px) {
  .banner-wrapper {
    height: 100vh;
    width: 100vw; 
    margin-left: calc(-50vw + 50%); 
  }

  .banner-img {
    height: 100vh;
  }

  .banner-title {
    font-size: 4rem;
  }

  .banner-subtitle {
    font-size: 1.5rem;
  }

  .banner-overlay {
    padding: 0 50px;
  }
}
  </style>
  