<template>
    <v-row dense class="mt-15 mb-15">
      <v-col
        v-for="(variant, i) in variants"
        :key="i"
        cols="12"
        md="4"
      >
        <v-card
          :variants="variants"
          class="mx-auto"
          color="surface-variant"
          max-width="344"
          title="Headline"
        >

            <v-img
            height="200px"
            :src="imageCourt"
            cover
            >
            </v-img>
            <template v-slot:actions>
                <v-btn text="RESERVA"></v-btn>
            </template>
        </v-card>
  
        <div class="text-center text-caption">{{ variant }}</div>
      </v-col>
    </v-row>
  </template>

<script setup lang="ts">

    const variants: string[] = ['Pista1', 'Pista2', 'Pista3', 'Pista4', 'Pista5', 'Pista6'];

    const imageCourt = new URL('@/assets/court.jpg', import.meta.url).href

</script>

<style scoped>

</style>