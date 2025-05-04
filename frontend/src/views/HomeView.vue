<template>
    <Banner />
    <v-container v-if="userStore.isAuthenticated">
      <Datepicker 
        v-if="userStore.isAuthenticated"
        ref="datepickerRef" 
        @date-selected="onDateSelected" 
      />

      <ListCourt 
        v-if="userStore.isAuthenticated && dateSelected"
        :dateSelected="dateSelected"
        @court-selected="onCourtSelected"
      />
      
      <Resume
        v-if="userStore.isAuthenticated && dateSelected && courtSelected && endTime"
        :dateSelected="dateSelected"
        :endTime="endTime"
        :courtSelected="courtSelected"
        :selectedCourtObject="selectedCourtObject"
        @confirm-reservation="confirmReservation"
        @cancel-reservation="cancelReservation"
      />
    </v-container>
</template>


<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Banner from '../components/AppBanner.vue'
  import Datepicker from '@/components/AppDatepicker.vue';
  import ListCourt from '@/components/AppListCourt.vue';
  import Resume from '../components/AppResume.vue';
  import { useUsersStore } from '@/stores/userStore'
  import type { Court } from '@/types/court';
  import { useCourtsStore } from '@/stores/courtStore';
  import { add } from 'date-fns';


  //Variables
  const userStore = useUsersStore();
  const courtStore = useCourtsStore();

  //const datepickerRef = ref<HTMLElement | null>(null);

  const dateSelected = ref<Date| null>(null);
  const courtSelected = ref<number | null>(null);
  const endTime = ref<Date | null>(null);


  const onDateSelected = (date: Date) => {
    console.log('Fecha recibida de componente hijo DatePicker: ', date);
    dateSelected.value = date;

    //calcular la fecha final tras coger fecha inicio
    addReservationTime();
  }

  const onCourtSelected = (courtId: number ) => {
    console.log('Pista recibida de componente hijo ListCourt:', courtId);
    courtSelected.value = courtId;
  }

  //Objeto entero para poder mostrar info
  const selectedCourtObject = computed<Court | null>(() => {
    const court = courtStore.courts.find(c => c.id === courtSelected.value)
    console.log('Objeto court seleccionado: ', court);
    return court ?? null;
  })



  //Evento confirmar reserva del Resume
  const confirmReservation = (user: { id: number }) => {
    console.log('Reserva confirmada desde componente hijo Resume:', {
      court: courtSelected.value,
    })
    courtSelected.value = null;
  }
  //Evento cancelar reserva del Resume, reset variables
  const cancelReservation = () => {
    courtSelected.value = null;
    dateSelected.value = null;
    endTime.value = null;
  }


  const addReservationTime = () => {
    if (dateSelected.value) {
      endTime.value = add(dateSelected.value, { hours: 1, minutes: 30 });
      console.log('Hora final:', endTime.value);
    }
  }







  //Scroll de botón reservar a datepicker
  /*const scrollToDatepicker = async () => {
    console.log('Evento recibido');
    
    await nextTick() 
    datepickerRef.value?.scrollIntoView({ behavior: 'smooth' })
  }
  */

</script>
