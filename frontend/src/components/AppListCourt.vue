<template>
  <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10"> {{ t('courtDisponibility') }}</h1>
  <div v-if="filteredCourts.length === 0" class="text-center">
    {{ t('noDisponibility') }}
    </div>
    <v-row dense class="mt-15 mb-15">
      <v-col
        v-for="court in filteredCourts"
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
                <v-btn @click="selectCourt(court.id)">{{ t('book') }}</v-btn>
            </template>
        </v-card>
  
      </v-col>
    </v-row>
  </template>

<script setup lang="ts">

  import { useCourtsStore } from '@/stores/courtStore';
  import { useReservationsStore } from '@/stores/reservationStore';
  import { computed, watch } from 'vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const courtsStore = useCourtsStore();
  const reservationsStore = useReservationsStore();

  console.log('Numero de courts desde store:', courtsStore.courts);
  
  const imageCourt = new URL('@/assets/court.jpg', import.meta.url).href

  //prop del padre para hacer la búsqueda de pistas según la fecha seleccionada
  const {dateSelected, endDate} = defineProps<{
    dateSelected: Date | null,
    endDate: Date | null,
  }>()


  //Evento seleccion pista al padre
  const emit = defineEmits<{
    (e: 'courtSelected', courId : number ): void
  }>()

  function selectCourt(courtId : number) {
    emit('courtSelected', courtId)
  }





  const filteredCourts = computed(() => {
    if (!dateSelected || !endDate) return courtsStore.courts;
    console.log('Filtrando entre:', dateSelected.toISOString(), '-', endDate.toISOString());

    // Obtenemos las reservas que tienen conflicto
    const conflictingReservations = reservationsStore.getReservationsByDateandTime(dateSelected, endDate);
    console.log(conflictingReservations);

    // Si no hay reservas conflictivas, todas las pistas están disponibles
    if (conflictingReservations.length === 0) {
      console.log('Todas las pistas disponibles', courtsStore.courts);
      
      return courtsStore.courts;
    }

    // Filtrar pistas excluyendo las pistas de las reservas con conflicto
    return courtsStore.courts.filter(court => {
      
      const isAvailable = !conflictingReservations.some(
        reservation => reservation.courtId === court.id
      );

      // Mostrar el estado de cada pista
      console.log('Court:', court.id, 'isUnavailable:', isAvailable);

      return isAvailable;

    });
  });



  // monitorear cambios en las fechas
  watch(() => dateSelected, (newDate) => {
      if (newDate) {
        console.log('Fecha seleccionada cambiada a:', newDate.toISOString());
      }
    });

  watch(() => endDate, (newDate) => {
    if (newDate) {
      console.log('Fecha fin cambiada a:', newDate.toISOString());
    }
  });


</script>

<style scoped>

</style>