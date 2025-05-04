<template>
  <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Pistas disponibles</h1>
    <v-row dense class="mt-15 mb-15">
      <v-col
        v-for="court in store.courts"
        :key="court.id"
        cols="12"
        md="4"
        class="mt-2 "
      >
        <v-card
          class="mx-auto"
          color="surface-variant"
          max-width="344"
          :title="court.name"
        >

            <v-img
            height="200px"
            :src="imageCourt"
            cover
            >
            </v-img>
            <template v-slot:actions>
                <v-btn @click="selectCourt(court.id)" text="RESERVA"></v-btn>
            </template>
        </v-card>
  
        
      </v-col>
    </v-row>
  </template>

<script setup lang="ts">

  import { useCourtsStore } from '@/stores/courtStore';
  import { onMounted } from 'vue';

    const store = useCourtsStore();
    console.log('Numero de courts desde store:', store.courts);
    

    //const courts: string[] = ['Pista1', 'Pista2', 'Pista3', 'Pista4', 'Pista5', 'Pista6'];

    const imageCourt = new URL('@/assets/court.jpg', import.meta.url).href


    //Evento seleccion pista al padre
    const emit = defineEmits<{
      (e: 'courtSelected', courId : number ): void
    }>()

    function selectCourt(courtId : number) {
      emit('courtSelected', courtId)
    }


    //prop del padre para hacer la búsqueda de pistas según la fecha seleccionada
    const props = defineProps<{
      dateSelected: Date | null
    }>()


    onMounted(() => {
      store.fetchAll()
    })

</script>

<style scoped>

</style>