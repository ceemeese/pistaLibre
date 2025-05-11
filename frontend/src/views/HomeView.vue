<template>
    <Banner 
      @scroll-to-datepicker="scrollToDatepicker"
      />
    <v-container v-if="userStore.isAuthenticated">
      <section ref="my-datepicker" >
        <Datepicker 
          @date-selected="onDateSelected" 
          @resetCourt="resetCourtSelected"
          @scroll-to-list="scrollToList"
        />
      </section>

      <section ref="my-list" >
        <ListCourt 
          ref="listCourtRef"
          v-if="dateSelected"
          :dateSelected="dateSelected"
          :endDate="endDate"
          @court-selected="onCourtSelected"
        />
      </section>
      
      <section ref="my-resume">
      <Resume
        v-if="dateSelected && courtSelected && endDate"
        :dateSelected="dateSelected"
        :endDate="endDate"
        :courtSelected="courtSelected"
        :selectedCourtObject="selectedCourtObject"
        @confirm-reservation="confirmReservation"
        @cancel-reservation="cancelReservation"
      />
      </section>
    </v-container>
</template>


<script setup lang="ts">
  import { ref, computed, useTemplateRef } from 'vue'
  import Banner from '../components/AppBanner.vue'
  import Datepicker from '@/components/AppDatepicker.vue';
  import ListCourt from '@/components/AppListCourt.vue';
  import Resume from '../components/AppResume.vue';
  import { useUsersStore } from '@/stores/userStore'
  import type { Court } from '@/types/court';
  import { useCourtsStore } from '@/stores/courtStore';
  import { add } from 'date-fns';
  import type { NewReservation, ReservationResult } from '@/types/reservation';
  import { useReservationsStore } from '@/stores/reservationStore';
  import { toast } from 'vue3-toastify';
  import { useI18n } from 'vue-i18n'
  import { nextTick } from 'vue';



  //Variables
  const userStore = useUsersStore();
  const courtStore = useCourtsStore();
  const reservationStore = useReservationsStore();
  const { t } = useI18n() 

  const datepicker = useTemplateRef('my-datepicker');
  const mylist = useTemplateRef('my-list');
  const resume = useTemplateRef('my-resume');
  
  const listCourtRef = ref();
  
  const dateSelected = ref<Date| null>(null);
  const courtSelected = ref<number | null>(null);
  const endDate = ref<Date | null>(null);


  const onDateSelected = (date: Date) => {
    console.log('Fecha recibida de componente hijo DatePicker: ', date);
    dateSelected.value = date;

    //calcular la fecha final tras coger fecha inicio
    addReservationTime();
    scrollToList();
  }

  const onCourtSelected = (courtId: number ) => {
    console.log('Pista recibida de componente hijo ListCourt:', courtId);
    courtSelected.value = courtId;
    scrollToResume()
  }

  //Objeto entero para poder mostrar info
  const selectedCourtObject = computed<Court | null>(() => {
    const court = courtStore.courts.find(c => c.id === courtSelected.value)
    console.log('Objeto court seleccionado: ', court);
    return court ?? null;
  })


  function resetCourtSelected() {
    courtSelected.value = null; 
  }


  //Evento confirmar reserva del Resume
  const confirmReservation = async (user: { id: number }) => {

    console.log('Reserva confirmada desde componente hijo Resume');

    if (userStore.loggedUser!.id && courtSelected.value && dateSelected.value && endDate.value) {

      const newReservation:  NewReservation = {
        userId: userStore.loggedUser!.id,
        courtId: courtSelected.value,
        date: dateSelected.value,
        endDate: endDate.value, 
      }
    
      const result: ReservationResult = await reservationStore.addReservation(newReservation);

      toast(t(result.message), {type: result.success ? 'success' : 'error',});
      cancelReservation();

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



  //Scrolls
  function scrollToDatepicker() {
    nextTick(() => {
    datepicker.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    });
  }

  function scrollToList() {
    nextTick(() => {
      mylist.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function scrollToResume() {
    nextTick(() => {
      resume.value?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

</script>
