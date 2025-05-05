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
        :endDate="endDate"
        @court-selected="onCourtSelected"
      />
      
      <Resume
        v-if="userStore.isAuthenticated && dateSelected && courtSelected && endDate"
        :dateSelected="dateSelected"
        :endDate="endDate"
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
  import type { NewReservation } from '@/types/reservation';
  import { useReservationsStore } from '@/stores/reservationStore';


  //Variables
  const userStore = useUsersStore();
  const courtStore = useCourtsStore();
  const reservationStore = useReservationsStore();

  //const datepickerRef = ref<HTMLElement | null>(null);

  const dateSelected = ref<Date| null>(null);
  const courtSelected = ref<number | null>(null);
  const endDate = ref<Date | null>(null);


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

    console.log('Reserva confirmada desde componente hijo Resume');

    if (userStore.loggedUser!.id && courtSelected.value && dateSelected.value && endDate.value) {

      const newReservation:  NewReservation = {
        userId: userStore.loggedUser!.id,
        courtId: courtSelected.value,
        date: dateSelected.value,
        endDate: endDate.value, 
      }

      reservationStore.addReservation(newReservation);

    } else {
      console.log("Alguno de los campos está vacío");
    }
  } 


  //Evento cancelar reserva del Resume, reset variables
  const cancelReservation = () => {
    courtSelected.value = null;
    dateSelected.value = null;
    endDate.value = null;
  }


  const addReservationTime = () => {
    if (dateSelected.value) {
      endDate.value = add(dateSelected.value, { hours: 1, minutes: 30 });
      console.log('Hora final:', endDate.value);
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
