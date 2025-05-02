<template>
    <Banner @scrollToDatepicker="scrollToDatepicker"/>
    <v-container v-if="userStore.isAuthenticated">
      <Datepicker ref="datepickerRef" v-if="userStore.isAuthenticated" @date-selected="onDateSelected" />
      <ListCourt v-if="userStore.isAuthenticated && dateSelected" />
      <Resume
      v-if="userStore.isAuthenticated && dateSelected && pistaSeleccionada"
      :pista="pistaSeleccionada || 'Pista 1'"
      :reserva="reserva"
      @confirmar="confirmarReserva"
      @cancelar="cancelarReserva"
    />
    </v-container>
</template>


<script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue'
  import Banner from '../components/AppBanner.vue'
  import Datepicker from '@/components/AppDatepicker.vue';
  import ListCourt from '@/components/AppListCourt.vue';
  import Resume from '../components/AppResume.vue';
  import { useUsersStore } from '@/stores/userStore'


  //Variables
  const userStore = useUsersStore()

  const datepickerRef = ref<HTMLElement | null>(null);
  const dateSelected = ref<string | null>(null)

  const onDateSelected = (date: string) => {
    dateSelected.value = date
  }


  //Scroll de botón reservar a datepicker
  const scrollToDatepicker = async () => {
    console.log('Evento recibido');
    
    await nextTick() 
    datepickerRef.value?.scrollIntoView({ behavior: 'smooth' })
  }
  

  const pistaSeleccionada = ref<string | null>('Pista 1')
  const reserva = ref({
    fecha: '2025-04-24',  
    hora: '18:00'       
  })

  const seleccionarPista = (pista: string) => {
  pistaSeleccionada.value = pista
  }

const confirmarReserva = (cliente: { nombre: string, email: string }) => {
  console.log('Reserva confirmada:', {
    pista: pistaSeleccionada.value,
    ...reserva.value,
    ...cliente
  })
  pistaSeleccionada.value = null
}

const cancelarReserva = () => {
  pistaSeleccionada.value = null
}

</script>
